import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Delete } from '@nestjs/common';
import { OrderCustomerVerifyPipe } from './pipes/order-customer-verify.pipe';
import { CreateOrderWithVerifiedCustomerDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: any) {
    console.log('controller create');
    return this.ordersService.createOrder(body);
  }

  /**
   * POST /orders/verified
   * 
   * Practice 10 - Create order with customer verification
   * 
   * This endpoint requires customer data and verifies it before creating the order.
   * The OrderCustomerVerifyPipe validates:
   * - fullName (trimmed, not empty)
   * - dob (dd/mm/yyyy format, year < 2010)
   * - phone (normalized to +855XXXXXXXXX)
   * - nationalId (optional, alphanumeric 6-12 chars)
   * 
   * Also checks if customer is blocked before allowing order creation.
   * 
   * @example
   * POST /orders/verified
   * {
   *   "customer": {
   *     "fullName": "  Lina  ",
   *     "dob": "01/01/2000",
   *     "phone": "012 345 678"
   *   },
   *   "items": [
   *     { "productId": "prod1", "quantity": 2 }
   *   ]
   * }
   */
  @Post('verified')
  createWithVerifiedCustomer(
    @Body(OrderCustomerVerifyPipe) body: CreateOrderWithVerifiedCustomerDto,
  ) {
    console.log('controller create with verified customer');
    console.log('Verified customer:', body.customer);
    return this.ordersService.createOrder(body);
  }

  @Delete()
  delete() {
    console.log('delete order!');
    return this.ordersService.deleteOrder();
  }
}

