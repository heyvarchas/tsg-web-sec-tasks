import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [tab, setTab] = useState('assets');

  // Assets state
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Issuance state
  const [issuances, setIssuances] = useState([]);
  const [issueForm, setIssueForm] = useState({ assetId: '', issuedTo: '', expectedReturn: '' });

  // Audit state
  const [logs, setLogs] = useState([]);

  // Users state (for issuance dropdown)
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const fetchAssets = async () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (statusFilter) params.append('status', statusFilter);
    const res = await fetch(`${API}/api/assets?${params}`, { headers: authHeaders() });
    const data = await res.json();
    if (data.success) setAssets(data.data.assets);
  };

  const fetchIssuances = async () => {
    const res = await fetch(`${API}/api/issuances`, { headers: authHeaders() });
    const data = await res.json();
    if (data.success) setIssuances(data.data.issuances);
  };

  const fetchAuditLog = async () => {
    const res = await fetch(`${API}/api/audit`, { headers: authHeaders() });
    const data = await res.json();
    if (data.success) setLogs(data.data.logs);
  };

  const fetchUsers = async () => {
    const res = await fetch(`${API}/api/users`, { headers: authHeaders() });
    const data = await res.json();
    if (data.success) setUsers(data.data.users);
  };

  useEffect(() => {
    fetchAssets();
  }, [search, statusFilter]);

  useEffect(() => {
    if (tab === 'issuances') { fetchIssuances(); fetchUsers(); }
    if (tab === 'audit') fetchAuditLog();
  }, [tab]);

  const handleIssue = async () => {
    const res = await fetch(`${API}/api/issuances`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(issueForm),
    });
    const data = await res.json();
    setMessage(data.success ? 'Asset issued successfully' : data.message);
    if (data.success) { setIssueForm({ assetId: '', issuedTo: '', expectedReturn: '' }); fetchIssuances(); fetchAssets(); }
  };

  const handleReturn = async (id) => {
    const res = await fetch(`${API}/api/issuances/${id}/return`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    const data = await res.json();
    setMessage(data.success ? 'Asset returned successfully' : data.message);
    if (data.success) { fetchIssuances(); fetchAssets(); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>DIMS Dashboard</h2>
        <div>
          <span style={styles.role}>{role}</span>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['assets', 'issuances', 'audit'].map((t) => (
          <button key={t} style={{ ...styles.tab, ...(tab === t ? styles.activeTab : {}) }} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {message && <p style={styles.message}>{message}</p>}

      {/* Assets Tab */}
      {tab === 'assets' && (
        <div>
          <div style={styles.filters}>
            <input style={styles.input} placeholder="Search by name or serial..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <select style={styles.input} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="issued">Issued</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>{['Name', 'Category', 'Serial No.', 'Status'].map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a._id}>
                  <td style={styles.td}>{a.name}</td>
                  <td style={styles.td}>{a.category}</td>
                  <td style={styles.td}>{a.serialNumber}</td>
                  <td style={styles.td}><span style={{ ...styles.badge, background: a.status === 'available' ? '#4caf50' : a.status === 'issued' ? '#f44336' : '#ff9800' }}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Issuances Tab */}
      {tab === 'issuances' && (
        <div>
          {role === 'admin' && (
            <div style={styles.card}>
              <h4 style={{ marginTop: 0 }}>Issue an Asset</h4>
              <select style={styles.input} value={issueForm.assetId} onChange={(e) => setIssueForm({ ...issueForm, assetId: e.target.value })}>
                <option value="">Select Asset</option>
                {assets.filter((a) => a.status === 'available').map((a) => <option key={a._id} value={a._id}>{a.name} — {a.serialNumber}</option>)}
              </select>
              <select style={styles.input} value={issueForm.issuedTo} onChange={(e) => setIssueForm({ ...issueForm, issuedTo: e.target.value })}>
                <option value="">Select User</option>
                {users.map((u) => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
              </select>
              <input style={styles.input} type="date" value={issueForm.expectedReturn} onChange={(e) => setIssueForm({ ...issueForm, expectedReturn: e.target.value })} />
              <button style={styles.button} onClick={handleIssue}>Issue Asset</button>
            </div>
          )}
          <table style={styles.table}>
            <thead>
              <tr>{['Asset', 'Issued To', 'Expected Return', 'Status', ...(role === 'admin' ? ['Action'] : [])].map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {issuances.map((i) => (
                <tr key={i._id}>
                  <td style={styles.td}>{i.asset?.name}</td>
                  <td style={styles.td}>{i.issuedTo?.name}</td>
                  <td style={styles.td}>{new Date(i.expectedReturn).toLocaleDateString()}</td>
                  <td style={styles.td}>{i.status}</td>
                  {role === 'admin' && <td style={styles.td}>{i.status === 'active' && <button style={styles.returnBtn} onClick={() => handleReturn(i._id)}>Return</button>}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit Tab */}
      {tab === 'audit' && (
        <table style={styles.table}>
          <thead>
            <tr>{['Asset', 'Action', 'Performed By', 'Date'].map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l._id}>
                <td style={styles.td}>{l.asset?.name}</td>
                <td style={styles.td}>{l.action}</td>
                <td style={styles.td}>{l.performedBy?.name}</td>
                <td style={styles.td}>{new Date(l.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '960px', margin: '0 auto', padding: '1.5rem', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  role: { marginRight: '1rem', background: '#eee', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' },
  logoutBtn: { padding: '0.4rem 0.8rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  tabs: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' },
  tab: { padding: '0.5rem 1.2rem', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', cursor: 'pointer' },
  activeTab: { background: '#333', color: '#fff', borderColor: '#333' },
  filters: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.8rem', width: '100%', boxSizing: 'border-box' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '0.6rem', borderBottom: '2px solid #ddd', fontSize: '0.85rem' },
  td: { padding: '0.6rem', borderBottom: '1px solid #eee', fontSize: '0.9rem' },
  badge: { padding: '0.2rem 0.6rem', borderRadius: '12px', color: '#fff', fontSize: '0.8rem' },
  card: { background: '#f9f9f9', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' },
  button: { padding: '0.5rem 1.2rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  returnBtn: { padding: '0.3rem 0.7rem', background: '#e53935', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  message: { background: '#e8f5e9', padding: '0.6rem 1rem', borderRadius: '4px', marginBottom: '1rem', color: '#2e7d32' },
};