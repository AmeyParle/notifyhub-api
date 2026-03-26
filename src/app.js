const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const notificationRoutes = require('./routes/notification.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NotificationHub is running'
  });
});

app.get('/ready', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NotificationHub is ready'
  });
});

app.use('/api/notifications', notificationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;