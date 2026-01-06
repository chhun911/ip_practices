import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

/**
 * PhoneNormalizePipe - Transforms and validates phone numbers
 * 
 * This pipe demonstrates that pipes can transform data, not only validate.
 * 
 * Rules:
 * - Remove spaces, dashes, and parentheses
 * - If starts with 0, convert to +855 (Cambodia country code)
 * - Must end up like +855XXXXXXXXX (9 digits after country code)
 * 
 * Checkpoint tests:
 * - "012 345 678" → "+85512345678"
 * - "+85512345678" stays same
 * - "abc" ❌ (not a valid phone)
 */
@Injectable()
export class PhoneNormalizePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string') {
      throw new BadRequestException(
        `${metadata.data || 'phone'} must be a string`,
      );
    }

    // Step 1: Remove spaces, dashes, and parentheses
    let normalized = value.replace(/[\s\-()]/g, '');

    // Step 2: Check if it contains only valid characters (digits and optional leading +)
    if (!/^\+?\d+$/.test(normalized)) {
      throw new BadRequestException(
        `${metadata.data || 'phone'} contains invalid characters`,
      );
    }

    // Step 3: If starts with 0, convert to +855 (Cambodia)
    if (normalized.startsWith('0')) {
      normalized = '+855' + normalized.substring(1);
    }

    // Step 4: Ensure it starts with +855
    if (!normalized.startsWith('+855')) {
      // If it doesn't start with + at all, assume it needs +855
      if (!normalized.startsWith('+')) {
        normalized = '+855' + normalized;
      }
    }

    // Step 5: Validate final format: +855 followed by 8-9 digits
    // Cambodian phone numbers are typically 8-9 digits after country code
    const phoneRegex = /^\+855\d{8,9}$/;
    if (!phoneRegex.test(normalized)) {
      throw new BadRequestException(
        `${metadata.data || 'phone'} must be a valid Cambodian phone number (+855XXXXXXXX or +855XXXXXXXXX)`,
      );
    }

    return normalized;
  }
}
