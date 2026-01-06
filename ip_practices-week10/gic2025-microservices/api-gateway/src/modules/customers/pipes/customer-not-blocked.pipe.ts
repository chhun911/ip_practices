import {
  PipeTransform,
  Injectable,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CustomersService } from '../customers.service';

/**
 * CustomerNotBlockedPipe - DI Pipe that checks if customer is blocked
 * 
 * This pipe demonstrates dependency injection in pipes.
 * It uses CustomersService to check against blocked lists.
 * 
 * Can be applied to:
 * - phone param: checks if phone is blocked
 * - whole body: checks all customer data
 * 
 * Throws 403 Forbidden if customer is blocked
 */
@Injectable()
export class CustomerNotBlockedPipe implements PipeTransform {
  constructor(
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  transform(value: any): any {
    // If value is a string, assume it's a phone number
    if (typeof value === 'string') {
      if (this.customersService.isBlockedPhone(value)) {
        throw new ForbiddenException('Phone number is blocked');
      }
      return value;
    }

    // If value is an object, check all fields
    if (typeof value === 'object' && value !== null) {
      const blockCheck = this.customersService.checkCustomerBlocked({
        phone: value.phone,
        nationalId: value.nationalId,
        fullName: value.fullName,
      });

      if (blockCheck.blocked) {
        throw new ForbiddenException(blockCheck.reason);
      }
    }

    return value;
  }
}
