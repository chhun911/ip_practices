// ============================================
// Code-First Create Product Input
// Part B: Code-First GraphQL
// ============================================

import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  IsUUID,
} from 'class-validator';

/**
 * CreateProductInput - GraphQL Input Type for creating products
 * 
 * @InputType() decorator defines this as an input type
 * which is used for mutation arguments
 * 
 * class-validator decorators provide validation
 */
@InputType()
export class CreateProductInput {
  @Field({ description: 'Name of the product' })
  @IsNotEmpty({ message: 'Product name is required' })
  @IsString()
  @MaxLength(200, { message: 'Product name must not exceed 200 characters' })
  name: string;

  @Field(() => Float, { description: 'Price of the product' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be at least 0' })
  price: number;

  @Field({ description: 'Stock Keeping Unit - unique product code' })
  @IsNotEmpty({ message: 'SKU is required' })
  @IsString()
  @MaxLength(50, { message: 'SKU must not exceed 50 characters' })
  sku: string;

  @Field(() => ID, { description: 'ID of the category this product belongs to' })
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId: string;

  @Field({ nullable: true, description: 'Description of the product' })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @Field(() => Int, { 
    nullable: true, 
    defaultValue: 0, 
    description: 'Initial stock quantity' 
  })
  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock must be at least 0' })
  stock?: number;
}
