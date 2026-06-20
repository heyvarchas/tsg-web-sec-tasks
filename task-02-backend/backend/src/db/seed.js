require('dotenv').config();
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const User = require('../src/modules/auth/auth.model');
const Asset = require('../src/modules/assets/asset.model');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');

  // Check if already seeded
  const existingAdmin = await User.findOne({ email: 'admin@dims.com' });
  if (existingAdmin) {
    console.log('Database already seeded. Exiting.');
    process.exit(0);
  }

  // Create users
  const admin = await User.create({
    name: 'Super Admin',
    email: 'admin@dims.com',
    password: 'admin123',
    role: 'admin',
  });

  await User.create({
    name: 'John Doe',
    email: 'john@dims.com',
    password: 'user1234',
    role: 'user',
  });

  console.log('Users seeded');

  // Create assets
  const assetsData = [
    { name: 'MacBook Pro 14"', category: 'Laptop', serialNumber: 'MBP-2024-001', description: 'M3 Pro chip, 18GB RAM' },
    { name: 'Dell Monitor 27"', category: 'Monitor', serialNumber: 'DM-2024-001', description: '4K UHD display' },
    { name: 'Logitech MX Master 3', category: 'Peripheral', serialNumber: 'LMX-2024-001', description: 'Wireless mouse' },
    { name: 'iPhone 15 Pro', category: 'Mobile', serialNumber: 'IP15-2024-001', description: 'Company test device' },
    { name: 'iPad Air 5th Gen', category: 'Tablet', serialNumber: 'IPA-2024-001', description: 'For field operations' },
  ];

  for (const data of assetsData) {
    const asset = await Asset.create(data);
    const qrCode = await QRCode.toDataURL(`DIMS:${asset._id}`);
    asset.qrCode = qrCode;
    await asset.save();
  }

  console.log('Assets seeded');
  console.log('----------------------------');
  console.log('Admin  → admin@dims.com / admin123');
  console.log('User   → john@dims.com  / user1234');
  console.log('----------------------------');

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});