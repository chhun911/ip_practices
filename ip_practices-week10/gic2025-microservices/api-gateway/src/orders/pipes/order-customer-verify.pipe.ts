import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { CustomersService } from '../../modules/customers/customers.service';

/**
 * OrderCustomerVerifyPipe - Pipe for verifying customer data in order requests
 * 
 * This pipe extracts and validates the customer object from an order request.
 * It validates and normalizes customer data before allowing order creation.
 * 
 * Usage: @Body(OrderCustomerVerifyPipe) body: CreateOrderDto
 */
@Injectable()
export class OrderCustomerVerifyPipe implements PipeTransform {
  constructor(
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  transform(value: any): any {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Request body must be an object');
    }

    // Extract customer data from order body
    const customer = value.customer;

    if (!customer || typeof customer !== 'object') {
      throw new BadRequestException('customer field is required');
    }

    // Validate and transform customer data
    const normalizedCustomer = {
      fullName: this.validateAndTrimFullName(customer.fullName),
      dob: this.validateDob(customer.dob),
      phone: this.normalizeAndValidatePhone(customer.phone),
      ...(customer.nationalId && {
        nationalId: this.validateNationalId(customer.nationalId),
      }),
    };

    // Check if customer is blocked
    const blockCheck = this.customersService.checkCustomerBlocked(normalizedCustomer);
    if (blockCheck.blocked) {
      throw new ForbiddenException(
        `Cannot create order: ${blockCheck.reason}`,
      );
    }

    // Return the original value with normalized customer
    return {
      ...value,
      customer: normalizedCustomer,
    };
  }

  private validateAndTrimFullName(fullName: any): string {
    if (typeof fullName !== 'string') {
      throw new BadRequestException('customer.fullName must be a string');
    }
    const trimmed = fullName.trim();
    if (trimmed.length === 0) {
      throw new BadRequestException('customer.fullName cannot be empty');
    }
    return trimmed;
  }

  private validateDob(dob: any): string {
    if (typeof dob !== 'string') {
      throw new BadRequestException('customer.dob must be a string');
    }

    const formatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dob.match(formatRegex);

    if (!match) {
      throw new BadRequestException('customer.dob must be in format dd/mm/yyyy');
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    if (!this.isValidDate(day, month, year)) {
      throw new BadRequestException('customer.dob is not a valid calendar date');
    }

    if (year >= 2010) {
      throw new BadRequestException('customer.dob year must be before 2010');
    }

    return dob;
  }

  private normalizeAndValidatePhone(phone: any): string {
    if (typeof phone !== 'string') {
      throw new BadRequestException('customer.phone must be a string');
    }

    let normalized = phone.replace(/[\s\-()]/g, '');

    if (!/^\+?\d+$/.test(normalized)) {
      throw new BadRequestException('customer.phone contains invalid characters');
    }

    if (normalized.startsWith('0')) {
      normalized = '+855' + normalized.substring(1);
    }

    if (!normalized.startsWith('+855') && !normalized.startsWith('+')) {
      normalized = '+855' + normalized;
    }

    const phoneRegex = /^\+855\d{8,9}$/;
    if (!phoneRegex.test(normalized)) {
      throw new BadRequestException(
        'customer.phone must be a valid Cambodian phone number',
      );
    }

    return normalized;
  }

  private validateNationalId(nationalId: any): string | undefined {
    if (nationalId === undefined || nationalId === null) {
      return undefined;
    }
    if (typeof nationalId !== 'string') {
      throw new BadRequestException('customer.nationalId must be a string');
    }
    const trimmed = nationalId.trim();
    if (trimmed.length === 0) {
      return undefined;
    }
    if (!/^[A-Za-z0-9]{6,12}$/.test(trimmed)) {
      throw new BadRequestException(
        'customer.nationalId must be alphanumeric and 6-12 characters long',
      );
    }
    return trimmed.toUpperCase();
  }

  private isValidDate(day: number, month: number, year: number): boolean {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[1] = 29;
    }
    return day <= daysInMonth[month - 1];
  }
}
