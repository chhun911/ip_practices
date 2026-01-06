import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  VerifyCustomerResponse,
  NormalizedCustomerData,
} from './dto/verify-customer.dto';

// Import common pipes
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { DobFormatAndYearPipe } from '../../common/pipes/dob-format-and-year.pipe';
import { PhoneNormalizePipe } from '../../common/pipes/phone-normalize.pipe';

// Import feature-specific pipes
import { CustomerNotBlockedPipe } from './pipes/customer-not-blocked.pipe';
import { VerifyCustomerPipe } from './pipes/verify-customer.pipe';

/**
 * CustomersController - Handles customer verification endpoints
 * 
 * Demonstrates multiple approaches to using pipes:
 * 1. Parameter-level pipes (Part D)
 * 2. DI pipes for business rules (Part E)
 * 3. Whole-body pipe validation (Part F)
 */
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  /**
   * POST /customers/verify
   * 
   * Approach 1: Using parameter-level pipes
   * Each parameter gets its own pipe for validation/transformation
   * 
   * @example
   * POST /customers/verify
   * {
   *   "fullName": "  Lina  ",
   *   "dob": "01/01/2000",
   *   "phone": "012 345 678"
   * }
   * 
   * Response:
   * {
   *   "ok": true,
   *   "normalized": {
   *     "fullName": "Lina",
   *     "dob": "01/01/2000",
   *     "phone": "+85512345678"
   *   }
   * }
   */
  @Post('verify')
  verifyWithParameterPipes(
    @Body('fullName', TrimPipe) fullName: string,
    @Body('dob', DobFormatAndYearPipe) dob: string,
    @Body('phone', PhoneNormalizePipe, CustomerNotBlockedPipe) phone: string,
    @Body('nationalId') nationalId?: string,
  ): VerifyCustomerResponse {
    // At this point, all values are already validated and transformed by pipes
    return this.customersService.verifyCustomer({
      fullName,
      dob,
      phone,
      nationalId,
    });
  }

  /**
   * POST /customers/verify-full
   * 
   * Approach 2: Using whole-body pipe (Part F)
   * One pipe validates and transforms the entire body at once
   * 
   * This is more advanced and handles all validation in a single place
   */
  @Post('verify-full')
  verifyWithBodyPipe(
    @Body(VerifyCustomerPipe) body: NormalizedCustomerData,
  ): VerifyCustomerResponse {
    // Body is already validated, transformed, and blocked-list checked
    return {
      ok: true,
      normalized: body,
    };
  }
}
