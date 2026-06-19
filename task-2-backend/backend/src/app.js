const express = require('express');
const cors = require('cors');
const logger = require('./src/utils/logger');
const errorHandler = require('./src/middleware/errorHandler');

const authRoutes = require('./src/modules/auth/auth.routes');
const userRoutes = require('./src/modules/users/user.routes');
const assetRoutes = require('./src/modules/assets/asset.routes');
const issuanceRoutes = require('./src/modules/issuance/issuance.routes');
const auditRoutes = require('./src/modules/audit/audit.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/issuances', issuanceRoutes);
app.use('/api/audit', auditRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'DIMS API is running' });
});

// Error handler — must be last
app.use(errorHandler);

module.exports = app;