import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Delete } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: any) {
    console.log('controller create');
    return this.ordersService.createOrder(body);
  }
  @Delete()
  delete(){
    console.log('delete order!');
    return this.ordersService.deleteOrder();
  }
}

