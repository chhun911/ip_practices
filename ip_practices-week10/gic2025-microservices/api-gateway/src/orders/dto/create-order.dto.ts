/**
 * CreateOrderDto - DTO for creating an order with customer verification
 * 
 * Practice 10 - Integration with Customer Verification
 */
export interface CreateOrderDto {
  /**
   * Customer information - will be verified using VerifyCustomerPipe
   */
  customer: {
    fullName: string;
    dob: string;
    phone: string;
    nationalId?: string;
  };

  /**
   * Order items
   */
  items: Array<{
    productId: string;
    quantity: number;
    price?: number;
  }>;

  /**
   * Optional notes for the order
   */
  notes?: string;
}

/**
 * CreateOrderWithVerifiedCustomerDto - Order with pre-verified customer data
 */
export interface CreateOrderWithVerifiedCustomerDto {
  customer: {
    fullName: string;
    dob: string;
    phone: string;
    nationalId?: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
    price?: number;
  }>;
  notes?: string;
}
