import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerNotBlockedPipe } from './pipes/customer-not-blocked.pipe';
import { VerifyCustomerPipe } from './pipes/verify-customer.pipe';

/**
 * CustomersModule - Module for customer verification
 * 
 * Features:
 * - Customer verification endpoint
 * - Custom validation pipes (TrimPipe, DobFormatAndYearPipe, PhoneNormalizePipe)
 * - DI pipe for blocked list checking (CustomerNotBlockedPipe)
 * - Whole-body validation pipe (VerifyCustomerPipe)
 * 
 * No database required - uses in-memory blocked lists
 */
@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    // Register DI pipes as providers so they can inject services
    CustomerNotBlockedPipe,
    VerifyCustomerPipe,
  ],
  exports: [
    CustomersService,
    CustomerNotBlockedPipe,
    VerifyCustomerPipe,
  ],
})
export class CustomersModule {}
