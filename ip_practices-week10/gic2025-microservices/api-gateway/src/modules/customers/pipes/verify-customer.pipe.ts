import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { CustomersService } from '../customers.service';
import {
  VerifyCustomerRequest,
  NormalizedCustomerData,
} from '../dto/verify-customer.dto';

/**
 * VerifyCustomerPipe - Advanced pipe that validates and transforms entire body
 * 
 * This pipe receives the entire body object and:
 * 1. Validates all required fields
 * 2. Transforms/normalizes the data
 * 3. Checks against blocked lists (using DI)
 * 4. Returns a fully validated and normalized object
 * 
 * Usage: @Body(VerifyCustomerPipe) body: NormalizedCustomerData
 */
@Injectable()
export class VerifyCustomerPipe
  implements PipeTransform<VerifyCustomerRequest, NormalizedCustomerData>
{
  constructor(
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  transform(value: VerifyCustomerRequest): NormalizedCustomerData {
    // Validate that we have an object
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Request body must be an object');
    }

    // 1. Validate and trim fullName
    const fullName = this.validateAndTrimFullName(value.fullName);

    // 2. Validate DOB format and year
    const dob = this.validateDob(value.dob);

    // 3. Normalize and validate phone
    const phone = this.normalizeAndValidatePhone(value.phone);

    // 4. Optional: Validate nationalId pattern
    const nationalId = this.validateNationalId(value.nationalId);

    // 5. Check if customer is blocked (using service)
    const blockCheck = this.customersService.checkCustomerBlocked({
      phone,
      nationalId,
      fullName,
    });

    if (blockCheck.blocked) {
      throw new ForbiddenException(blockCheck.reason);
    }

    // Return normalized data
    return {
      fullName,
      dob,
      phone,
      ...(nationalId && { nationalId }),
    };
  }

  /**
   * Validates and trims fullName
   */
  private validateAndTrimFullName(fullName: any): string {
    if (typeof fullName !== 'string') {
      throw new BadRequestException('fullName must be a string');
    }

    const trimmed = fullName.trim();
    if (trimmed.length === 0) {
      throw new BadRequestException('fullName cannot be empty');
    }

    if (trimmed.length < 2) {
      throw new BadRequestException(
        'fullName must be at least 2 characters long',
      );
    }

    return trimmed;
  }

  /**
   * Validates DOB format (dd/mm/yyyy) and year constraint (< 2010)
   */
  private validateDob(dob: any): string {
    if (typeof dob !== 'string') {
      throw new BadRequestException('dob must be a string');
    }

    // Check format: dd/mm/yyyy
    const formatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dob.match(formatRegex);

    if (!match) {
      throw new BadRequestException('dob must be in format dd/mm/yyyy');
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Validate calendar date
    if (!this.isValidDate(day, month, year)) {
      throw new BadRequestException('dob is not a valid calendar date');
    }

    // Year constraint
    if (year >= 2010) {
      throw new BadRequestException('dob year must be before 2010');
    }

    return dob;
  }

  /**
   * Normalizes and validates phone number
   */
  private normalizeAndValidatePhone(phone: any): string {
    if (typeof phone !== 'string') {
      throw new BadRequestException('phone must be a string');
    }

    // Remove spaces, dashes, parentheses
    let normalized = phone.replace(/[\s\-()]/g, '');

    // Check for invalid characters
    if (!/^\+?\d+$/.test(normalized)) {
      throw new BadRequestException('phone contains invalid characters');
    }

    // Convert 0 prefix to +855
    if (normalized.startsWith('0')) {
      normalized = '+855' + normalized.substring(1);
    }

    // Ensure +855 prefix
    if (!normalized.startsWith('+855') && !normalized.startsWith('+')) {
      normalized = '+855' + normalized;
    }

    // Validate final format
    const phoneRegex = /^\+855\d{8,9}$/;
    if (!phoneRegex.test(normalized)) {
      throw new BadRequestException(
        'phone must be a valid Cambodian phone number (+855XXXXXXXX or +855XXXXXXXXX)',
      );
    }

    return normalized;
  }

  /**
   * Validates optional national ID pattern
   */
  private validateNationalId(nationalId: any): string | undefined {
    if (nationalId === undefined || nationalId === null) {
      return undefined;
    }

    if (typeof nationalId !== 'string') {
      throw new BadRequestException('nationalId must be a string');
    }

    const trimmed = nationalId.trim();
    if (trimmed.length === 0) {
      return undefined;
    }

    // Optional: Add pattern validation for national ID
    // Example: must be alphanumeric, 6-12 characters
    if (!/^[A-Za-z0-9]{6,12}$/.test(trimmed)) {
      throw new BadRequestException(
        'nationalId must be alphanumeric and 6-12 characters long',
      );
    }

    return trimmed.toUpperCase();
  }

  /**
   * Validates if the given day, month, year form a valid calendar date
   */
  private isValidDate(day: number, month: number, year: number): boolean {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.isLeapYear(year)) {
      daysInMonth[1] = 29;
    }

    return day <= daysInMonth[month - 1];
  }

  /**
   * Checks if a year is a leap year
   */
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
