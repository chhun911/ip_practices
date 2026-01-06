import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersService], // Event handlers via @EventPattern
})
export class OrdersModule {}
