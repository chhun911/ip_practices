import { DynamicModule, Module } from "@nestjs/common"; 
import { NotificationService } from "./notification.service";
import { NotificationModuleOptions } from "./notification.interface";

@Module({})
export class NotificationModule {
    static register(options: NotificationModuleOptions): DynamicModule {
        return {
            module: NotificationModule,
            providers: [
                {   
                    provide: 'Notification_Options',
                    useValue: options,
                },
                NotificationService,
            ],
            exports: [NotificationService],
        };
    }
    
    static forRoot(options: NotificationModuleOptions): DynamicModule {
        return {
            module: NotificationModule,
            providers: [
                {   
                    provide: 'Notification_Options',
                    useValue: options,
                },
                NotificationService,
            ],
            exports: [NotificationService],
            global: true,
        };
    }
}