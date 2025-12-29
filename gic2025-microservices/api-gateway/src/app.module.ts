import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationModule } from './notifications/notification.module';

dotenv.config();

@Module({
  imports: [
    OrdersModule,
    ReceiptsModule,
    PaymentsModule,
    NotificationsModule,
    NotificationModule.forRoot({
      appName: 'API Gateway Lab',
      defaultChannel: 'log',
      enable: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'order-worker',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [OrdersModule],
})
export class AppModule {}
