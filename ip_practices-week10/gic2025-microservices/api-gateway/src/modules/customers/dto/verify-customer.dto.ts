/**
 * VerifyCustomerRequest - Interface for customer verification input
 * 
 * This is a simple TypeScript interface WITHOUT class-validator decorators.
 * Validation will be done using custom pipes instead.
 */
export interface VerifyCustomerRequest {
  /**
   * Customer's full name
   */
  fullName: string;

  /**
   * Date of birth in dd/mm/yyyy format
   * Required field
   */
  dob: string;

  /**
   * Phone number (will be normalized by pipe)
   */
  phone: string;

  /**
   * National ID (optional)
   */
  nationalId?: string;
}

/**
 * VerifyCustomerResponse - Response from customer verification
 */
export interface VerifyCustomerResponse {
  ok: boolean;
  normalized?: {
    fullName: string;
    dob: string;
    phone: string;
    nationalId?: string;
  };
  error?: string;
}

/**
 * NormalizedCustomerData - Transformed customer data after pipe processing
 */
export interface NormalizedCustomerData {
  fullName: string;
  dob: string;
  phone: string;
  nationalId?: string;
}
