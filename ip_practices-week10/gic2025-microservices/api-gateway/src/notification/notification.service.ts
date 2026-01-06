import { Inject, Injectable } from "@nestjs/common";
import { NotificationModuleOptions } from "./notification.interface";

@Injectable()
export class NotificationService {
    constructor(
        @Inject('Notification_Options') private options: NotificationModuleOptions
    ) {}
    
    notify(message: string) {
        if (this.options.enable === false) {
            return;
        }
        
        const channel = this.options.defaultChannel || this.options.type || 'log';
        
        switch (channel) {
            case 'email':
                console.log(`[${this.options.appName || 'App'}] Sending email notification: ${message}`);
                break;
            case 'sms':
                console.log(`[${this.options.appName || 'App'}] Sending SMS notification: ${message}`);
                break;  
            case 'log':
                console.log(`[${this.options.appName || 'App'}] Logging notification: ${message}`);
                break;
        }
    }
}