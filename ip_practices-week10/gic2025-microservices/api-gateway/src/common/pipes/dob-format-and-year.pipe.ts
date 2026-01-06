import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

/**
 * DobFormatAndYearPipe - Validates date of birth format and year constraint
 * 
 * Rules:
 * - Must match format dd/mm/yyyy
 * - Must be a real calendar date (e.g., 31/02/2000 is invalid)
 * - Year must be < 2010 (customer must be born before 2010)
 * 
 * Checkpoint tests:
 * - 01/01/2000 ✅
 * - 31/02/2000 ❌ (Feb 31 doesn't exist)
 * - 01-01-2000 ❌ (wrong format, uses dashes)
 * - 01/01/2010 ❌ (year must be < 2010)
 */
@Injectable()
export class DobFormatAndYearPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string') {
      throw new BadRequestException(
        `${metadata.data || 'dob'} must be a string`,
      );
    }

    // Check format: dd/mm/yyyy
    const formatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = value.match(formatRegex);

    if (!match) {
      throw new BadRequestException(
        `${metadata.data || 'dob'} must be in format dd/mm/yyyy`,
      );
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Validate that it's a real calendar date
    if (!this.isValidDate(day, month, year)) {
      throw new BadRequestException(
        `${metadata.data || 'dob'} is not a valid calendar date`,
      );
    }

    // Check year constraint: must be < 2010
    if (year >= 2010) {
      throw new BadRequestException(
        `${metadata.data || 'dob'} year must be before 2010`,
      );
    }

    // Return the original value (valid)
    return value;
  }

  /**
   * Validates if the given day, month, year form a valid calendar date
   */
  private isValidDate(day: number, month: number, year: number): boolean {
    // Month must be 1-12
    if (month < 1 || month > 12) {
      return false;
    }

    // Day must be at least 1
    if (day < 1) {
      return false;
    }

    // Days in each month (non-leap year)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust February for leap years
    if (this.isLeapYear(year)) {
      daysInMonth[1] = 29;
    }

    // Check if day is valid for the given month
    return day <= daysInMonth[month - 1];
  }

  /**
   * Checks if a year is a leap year
   */
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
