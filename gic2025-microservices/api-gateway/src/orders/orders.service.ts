import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsService } from 'src/payments/payments.service';
import { NotificationsService } from 'src/notifications/notification.service';

@Injectable()
export class OrdersService implements OnModuleInit {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly client: ClientProxy,
    private readonly paymentsService: PaymentsService,
    private readonly notifications: NotificationsService, 
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ, will retry on first message');
    }
  }

  createOrder(orderDto: any) {
    console.log('Emitting order_created');
    this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });

    this.notifications.notify('orders', 'order_created', {
      order: orderDto,
      createdAt: new Date().toISOString(),
    });

    return { status: 'Order accepted', order: orderDto };
  }

  deleteOrder() {
    console.log('Emitting order_deleted');
    this.client.emit('order_deleted', {});
    return { status: 'Order deletion request sent' };
  }
}