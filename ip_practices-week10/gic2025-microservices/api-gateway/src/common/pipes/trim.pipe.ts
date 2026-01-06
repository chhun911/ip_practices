import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

/**
 * TrimPipe - Trims whitespace from string inputs
 * 
 * Usage: @Body('fullName', TrimPipe) fullName: string
 * 
 * Example:
 *   "  Lina  " → "Lina"
 *   "   " → throws BadRequestException (empty after trim)
 */
@Injectable()
export class TrimPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    // If value is not a string, return as-is (let other validators handle it)
    if (typeof value !== 'string') {
      throw new BadRequestException(
        `${metadata.data || 'Field'} must be a string`,
      );
    }

    const trimmed = value.trim();

    // Reject if result is empty after trimming
    if (trimmed.length === 0) {
      throw new BadRequestException(
        `${metadata.data || 'Field'} cannot be empty`,
      );
    }

    return trimmed;
  }
}
