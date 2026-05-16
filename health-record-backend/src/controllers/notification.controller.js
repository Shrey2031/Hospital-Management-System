// controllers/notificationController.js
import {Notification} from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 20, read = null } = req.query;
        const filter = { userId: req.user._id };

        if (read !== null) filter.isRead = read === 'true';

        const notifications = await Notification.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            

        const total = await Notification.countDocuments(filter);
        const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });

        res.json({
            success: true,
            notifications,
            unreadCount,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, userId: req.user._id },
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.json({
            success: true,
            notification
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.user._id, isRead: false },
            { isRead: true }
        );

        res.json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};