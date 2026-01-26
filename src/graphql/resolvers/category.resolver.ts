// ============================================
// Schema-First Category Resolver
// Part A: Schema-First GraphQL
// ============================================

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../modules/category/category.service';

@Resolver('Category') // <-- matches schema type name
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  // ============================================
  // Queries
  // ============================================

  /**
   * Get all categories
   * Query: categories
   */
  @Query('categories') // <-- matches schema query name
  async categories() {
    return this.categoryService.findAll();
  }

  /**
   * Get a single category by ID
   * Query: category(id: ID!)
   */
  @Query('category')
  async category(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  // ============================================
  // Mutations
  // ============================================

  /**
   * Create a new category
   * Mutation: createCategory(name: String!, description: String)
   */
  @Mutation('createCategory')
  async createCategory(
    @Args('name') name: string,
    @Args('description') description?: string,
  ) {
    return this.categoryService.create({ name, description });
  }
}
