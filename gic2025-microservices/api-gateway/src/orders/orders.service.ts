import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService implements OnModuleInit {
  constructor(@Inject('ORDERS_SERVICE') private readonly client: ClientProxy) {}

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
    this.client.emit('order_created', orderDto);
    return { status: 'Order accepted', order: orderDto };
  }

  deleteOrder() {
    console.log('Emitting order_deleted');
    this.client.emit('order_deleted', {});
    return { status: 'Order deletion request sent' };
  }
}