import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationModule } from './notifications/notification.module';

// Practice 9 - Database Dynamic Module and Feature Modules
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { Category } from './modules/category/entities/category.entity';
import { Product } from './modules/product/entities/product.entity';

// Practice 10 - Customer Verification Module (Validation & Pipes)
import { CustomersModule } from './modules/customers/customers.module';

dotenv.config();

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM for existing modules (receipts uses this)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'nest_lab',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Practice 9 - Dynamic Database Module with forRoot()
    // This demonstrates a custom dynamic module pattern
    // Uses DATA_SOURCE token for manual repository injection
    DatabaseModule.forRoot({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'nest_lab',
      entities: [Category, Product],
    }),

    // Practice 9 - Category and Product Modules (using custom DatabaseModule)
    CategoryModule,
    ProductModule,

    // Practice 10 - Customer Verification Module
    CustomersModule,

    // Existing modules (kept for backward compatibility)
    OrdersModule,
    ReceiptsModule,
    PaymentsModule,
    NotificationsModule,
    NotificationModule.forRoot({
      appName: 'API Gateway Lab',
      defaultChannel: 'log',
      enable: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [OrdersModule],
})
export class AppModule {}
