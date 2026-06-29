{/* Import components from the react-router-dom library for client-side routing */}
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
{/* Next I'll import necessary documents */}
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

{/* I'm going to do something apparently called destructuring */}
{/* This is just to create a reusable piece of code */}
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};

{/* Create and export the main App component */}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}