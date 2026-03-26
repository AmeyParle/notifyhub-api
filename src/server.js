require('dotenv').config();

const app = require('./app');
const prisma = require('./config/prisma');

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('NotificationHub database connected successfully');

    app.listen(PORT, () => {
      console.log(`NotificationHub running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start NotificationHub:', error);
    process.exit(1);
  }
};

startServer();