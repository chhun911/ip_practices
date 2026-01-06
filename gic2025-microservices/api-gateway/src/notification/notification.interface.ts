export interface NotificationModuleOptions {
    appName?: string;
    defaultChannel?: 'email' | 'sms' | 'log';
    type?: 'email' | 'sms' | 'log';
    enable?: boolean;
}