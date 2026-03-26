const prisma = require('../config/prisma');
const asyncHandler = require('../utils/asyncHandler');

const createNotification = asyncHandler(async (req, res) => {
  const { type, message, recipientId, source, metadata } = req.body;

  if (!type || !type.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Notification type is required.'
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Notification message is required.'
    });
  }

  if (!source || !source.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Notification source is required.'
    });
  }

  const parsedRecipientId =
    recipientId !== undefined && recipientId !== null
      ? Number(recipientId)
      : null;

  if (
    recipientId !== undefined &&
    recipientId !== null &&
    Number.isNaN(parsedRecipientId)
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid recipientId.'
    });
  }

  const notification = await prisma.notification.create({
    data: {
      type: type.trim(),
      message: message.trim(),
      recipientId: parsedRecipientId,
      source: source.trim(),
      metadata: metadata || null
    }
  });

  return res.status(201).json({
    success: true,
    message: 'Notification created successfully.',
    data: notification
  });
});

const getNotifications = asyncHandler(async (req, res) => {
  const {
    recipientId,
    type,
    source,
    isRead,
    page = '1',
    limit = '10'
  } = req.query;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const parsedRecipientId = recipientId ? Number(recipientId) : undefined;

  if (Number.isNaN(parsedPage) || parsedPage < 1) {
    return res.status(400).json({
      success: false,
      message: 'Page must be a number greater than or equal to 1.'
    });
  }

  if (Number.isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be between 1 and 100.'
    });
  }

  if (recipientId && Number.isNaN(parsedRecipientId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid recipientId.'
    });
  }

  const where = {};

  if (recipientId) {
    where.recipientId = parsedRecipientId;
  }

  if (type) {
    where.type = type;
  }

  if (source) {
    where.source = source;
  }

  if (isRead !== undefined) {
    where.isRead = isRead === 'true';
  }

  const skip = (parsedPage - 1) * parsedLimit;

  const [notifications, totalItems] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: parsedLimit
    }),
    prisma.notification.count({ where })
  ]);

  const totalPages = Math.ceil(totalItems / parsedLimit);

  return res.status(200).json({
    success: true,
    message: 'Notifications fetched successfully.',
    data: notifications,
    pagination: {
      totalItems,
      totalPages,
      currentPage: parsedPage,
      pageSize: parsedLimit,
      hasNextPage: parsedPage < totalPages,
      hasPreviousPage: parsedPage > 1
    }
  });
});

const getNotificationById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid notification id.'
    });
  }

  const notification = await prisma.notification.findUnique({
    where: { id }
  });

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found.'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Notification fetched successfully.',
    data: notification
  });
});

const markAsRead = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid notification id.'
    });
  }

  const existingNotification = await prisma.notification.findUnique({
    where: { id }
  });

  if (!existingNotification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found.'
    });
  }

  const updatedNotification = await prisma.notification.update({
    where: { id },
    data: {
      isRead: true
    }
  });

  return res.status(200).json({
    success: true,
    message: 'Notification marked as read.',
    data: updatedNotification
  });
});

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  markAsRead
};