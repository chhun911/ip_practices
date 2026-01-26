// ============================================
// Code-First Category Type
// Part B: Code-First GraphQL
// ============================================

import { ObjectType, Field, ID } from '@nestjs/graphql';

/**
 * CategoryType - GraphQL Object Type for Category
 * 
 * @ObjectType() decorator tells NestJS/GraphQL this class
 * represents a GraphQL type that will be auto-generated
 * in the schema.gql file
 */
@ObjectType('Category') // Optional: specify GraphQL type name
export class CategoryType {
  @Field(() => ID, { description: 'Unique identifier for the category' })
  id: string;

  @Field({ description: 'Name of the category' })
  name: string;

  @Field({ nullable: true, description: 'Description of the category' })
  description?: string;
}
