// ============================================
// Code-First Product Type
// Part B: Code-First GraphQL
// ============================================

import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { CategoryType } from './category.type';

/**
 * ProductType - GraphQL Object Type for Product
 * 
 * @ObjectType() decorator tells NestJS/GraphQL this class
 * represents a GraphQL type that will be auto-generated
 * in the schema.gql file
 */
@ObjectType('Product')
export class ProductType {
  @Field(() => ID, { description: 'Unique identifier for the product' })
  id: string;

  @Field({ description: 'Name of the product' })
  name: string;

  @Field(() => Float, { description: 'Price of the product' })
  price: number;

  @Field({ description: 'Stock Keeping Unit - unique product code' })
  sku: string;

  @Field({ nullable: true, description: 'Description of the product' })
  description?: string;

  @Field(() => Int, { description: 'Available stock quantity' })
  stock: number;

  @Field(() => ID, { description: 'ID of the category this product belongs to' })
  categoryId: string;

  /**
   * Relation field - Category
   * This field will be resolved by the ProductCodeFirstResolver
   * using @ResolveField decorator
   */
  @Field(() => CategoryType, { 
    nullable: true, 
    description: 'The category this product belongs to' 
  })
  category?: CategoryType;
}
