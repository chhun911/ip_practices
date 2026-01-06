import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentsModule } from 'src/payments/payments.module';
import { NotificationModule } from 'src/notifications/notification.module';

// Practice 10 - Import CustomersModule for customer verification integration
import { CustomersModule } from 'src/modules/customers/customers.module';
import { OrderCustomerVerifyPipe } from './pipes/order-customer-verify.pipe';

@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    // Practice 10 - Import CustomersModule for VerifyCustomerPipe DI
    CustomersModule,
    NotificationModule.forFeature({
      featureName: 'orders',
      prefix: '[ORDERS]',
      channels: ['log', 'telegram'],
    }),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'orders_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  // Practice 10 - Register OrderCustomerVerifyPipe for DI
  providers: [OrdersService, OrderCustomerVerifyPipe],
  exports: [OrdersService],
})
export class OrdersModule {}
