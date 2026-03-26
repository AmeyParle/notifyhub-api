const express = require('express');
const {
  createNotification,
  getNotifications,
  getNotificationById,
  markAsRead
} = require('../controllers/notification.controller');
const { verifyServiceKey } = require('../middleware/serviceAuth.middleware');

const router = express.Router();

router.post('/', verifyServiceKey, createNotification);
router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.patch('/:id/read', markAsRead);

module.exports = router;