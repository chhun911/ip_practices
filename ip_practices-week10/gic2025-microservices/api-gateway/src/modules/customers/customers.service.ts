import { Injectable } from '@nestjs/common';
import { VerifyCustomerResponse } from './dto/verify-customer.dto';

/**
 * CustomersService - Manages customer verification business logic
 * 
 * Contains a fake "blocked list" for demonstration purposes:
 * - Blocked phones
 * - Blocked national IDs
 * - Blocked names
 */
@Injectable()
export class CustomersService {
  // In-memory blocked lists (hardcoded for lab purposes)
  private readonly blockedPhones: Set<string> = new Set([
    '+85512345000',
    '+85599999999',
    '+85511111111',
  ]);

  private readonly blockedNationalIds: Set<string> = new Set([
    'BLOCKED001',
    'BLOCKED002',
    'FAKE123456',
  ]);

  private readonly blockedNames: Set<string> = new Set([
    'john doe',
    'banned user',
    'test blocked',
  ]);

  /**
   * Check if a phone number is in the blocked list
   * @param phone - Normalized phone number (e.g., +85512345678)
   */
  isBlockedPhone(phone: string): boolean {
    return this.blockedPhones.has(phone);
  }

  /**
   * Check if a national ID is in the blocked list
   * @param nationalId - National ID to check (optional)
   */
  isBlockedNationalId(nationalId?: string): boolean {
    if (!nationalId) {
      return false;
    }
    return this.blockedNationalIds.has(nationalId.toUpperCase());
  }

  /**
   * Check if a name is in the blocked list
   * @param name - Customer name to check
   */
  isBlockedName(name: string): boolean {
    return this.blockedNames.has(name.toLowerCase());
  }

  /**
   * Check if any customer data is blocked
   * Returns the reason if blocked, null if not blocked
   */
  checkCustomerBlocked(data: {
    phone?: string;
    nationalId?: string;
    fullName?: string;
  }): { blocked: boolean; reason?: string } {
    if (data.phone && this.isBlockedPhone(data.phone)) {
      return { blocked: true, reason: 'Phone number is blocked' };
    }

    if (data.nationalId && this.isBlockedNationalId(data.nationalId)) {
      return { blocked: true, reason: 'National ID is blocked' };
    }

    if (data.fullName && this.isBlockedName(data.fullName)) {
      return { blocked: true, reason: 'Customer name is blocked' };
    }

    return { blocked: false };
  }

  /**
   * Verify customer data and return normalized response
   */
  verifyCustomer(data: {
    fullName: string;
    dob: string;
    phone: string;
    nationalId?: string;
  }): VerifyCustomerResponse {
    // Check if customer is blocked
    const blockCheck = this.checkCustomerBlocked(data);
    if (blockCheck.blocked) {
      return {
        ok: false,
        error: blockCheck.reason,
      };
    }

    // Return success with normalized data
    return {
      ok: true,
      normalized: {
        fullName: data.fullName,
        dob: data.dob,
        phone: data.phone,
        ...(data.nationalId && { nationalId: data.nationalId }),
      },
    };
  }
}
