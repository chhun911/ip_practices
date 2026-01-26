// ============================================
// Code-First Category Resolver
// Part B: Code-First GraphQL
// ============================================

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type';
import { CreateCategoryInput } from '../inputs/create-category.input';
import { CategoryService } from '../../modules/category/category.service';

/**
 * CategoryCodeFirstResolver
 * 
 * In code-first approach, the @Resolver decorator takes
 * a function returning the GraphQL type class instead of a string
 */
@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  constructor(private readonly categoryService: CategoryService) {}

  // ============================================
  // Queries
  // ============================================

  /**
   * Get all categories
   * 
   * @Query decorator specifies:
   * - Return type: [CategoryType] (array)
   * - Name is auto-generated from method name: "categories"
   */
  @Query(() => [CategoryType], { 
    name: 'categories', 
    description: 'Get all categories' 
  })
  async getCategories(): Promise<CategoryType[]> {
    return this.categoryService.findAll();
  }

  /**
   * Get a single category by ID
   */
  @Query(() => CategoryType, { 
    name: 'category', 
    nullable: true,
    description: 'Get a category by ID' 
  })
  async getCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CategoryType> {
    return this.categoryService.findOne(id);
  }

  // ============================================
  // Mutations
  // ============================================

  /**
   * Create a new category
   * 
   * Using InputType for complex input
   */
  @Mutation(() => CategoryType, { 
    name: 'createCategory',
    description: 'Create a new category' 
  })
  async createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.create(input);
  }

  /**
   * Alternative: Create category with individual arguments
   * (commented out - showing both patterns)
   */
  // @Mutation(() => CategoryType, { name: 'createCategorySimple' })
  // async createCategorySimple(
  //   @Args('name') name: string,
  //   @Args('description', { nullable: true }) description?: string,
  // ): Promise<CategoryType> {
  //   return this.categoryService.create({ name, description });
  // }
}
