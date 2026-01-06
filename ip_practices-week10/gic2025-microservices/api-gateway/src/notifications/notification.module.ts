import { DynamicModule, Module } from '@nestjs/common';
import { NOTIFICATION_OPTIONS, NOTIFICATION_FEATURES } from './constants';
import { NotificationModuleOptions, NotificationFeatureOptions } from './interfaces';
import { NotificationsService } from './notification.service';

// Static registry outside the class to persist across all calls
const featureRegistry: NotificationFeatureOptions[] = [];

@Module({})
export class NotificationModule {
  // ✅ App-level config, should be called ONCE (AppModule)
  static forRoot(options: NotificationModuleOptions): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        {
          provide: NOTIFICATION_OPTIONS,
          useValue: options,
        },
        // Provide features array via factory (will include all forFeature() calls)
        {
          provide: NOTIFICATION_FEATURES,
          useFactory: () => featureRegistry,
        },
        NotificationsService,
      ],
      exports: [NotificationsService],
      global: true, // optional: make it globally available without importing everywhere
    };
  }

  // ✅ Feature-level config, can be called MANY TIMES (OrdersModule, ReceiptsModule…)
  static forFeature(feature: NotificationFeatureOptions): DynamicModule {
    // Push feature to static registry (happens during module resolution)
    featureRegistry.push(feature);
    return {
      module: NotificationModule,
      providers: [],
    };
  }
}