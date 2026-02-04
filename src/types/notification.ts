export type NotificationType =
    | 'order_update'
    | 'promotion'
    | 'review_response'
    | 'price_drop'
    | 'back_in_stock'
    | 'system'
    | 'message';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';
export type NotificationChannel = 'in_app' | 'email' | 'push' | 'sms';

export interface NotificationAction {
    label: string;
    url: string;
    isPrimary: boolean;
}

export interface NotificationMetadata {
    orderId?: string;
    productId?: string;
    userId?: string;
    [key: string]: string | undefined;
}

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    priority: NotificationPriority;
    channels: NotificationChannel[];
    title: string;
    message: string;
    icon?: string;
    image?: string;
    actions: NotificationAction[];
    metadata: NotificationMetadata;
    isRead: boolean;
    readAt?: Date;
    expiresAt?: Date;
    createdAt: Date;
}

export interface NotificationPreferences {
    userId: string;
    channels: {
        [K in NotificationType]: NotificationChannel[];
    };
    quietHours: {
        enabled: boolean;
        start: string;
        end: string;
        timezone: string;
    };
    frequency: 'realtime' | 'daily_digest' | 'weekly_digest';
}
