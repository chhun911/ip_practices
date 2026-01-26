// ============================================
// Code-First Create Category Input
// Part B: Code-First GraphQL
// ============================================

import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

/**
 * CreateCategoryInput - GraphQL Input Type for creating categories
 * 
 * @InputType() decorator defines this as an input type
 * which is used for mutation arguments
 * 
 * class-validator decorators provide validation
 */
@InputType()
export class CreateCategoryInput {
  @Field({ description: 'Name of the category' })
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString()
  @MaxLength(100, { message: 'Category name must not exceed 100 characters' })
  name: string;

  @Field({ nullable: true, description: 'Description of the category' })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;
}
