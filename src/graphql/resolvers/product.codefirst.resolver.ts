// ============================================
// Code-First Product Resolver
// Part B: Code-First GraphQL
// ============================================

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CategoryType } from '../types/category.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductService } from '../../modules/product/product.service';
import { CategoryService } from '../../modules/category/category.service';

/**
 * ProductCodeFirstResolver
 * 
 * In code-first approach, the @Resolver decorator takes
 * a function returning the GraphQL type class
 */
@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  // ============================================
  // Queries
  // ============================================

  /**
   * Get all products
   */
  @Query(() => [ProductType], { 
    name: 'products',
    description: 'Get all products' 
  })
  async getProducts(): Promise<ProductType[]> {
    const result = await this.productService.findAll({});
    return result.data;
  }

  /**
   * Get a single product by ID
   */
  @Query(() => ProductType, { 
    name: 'product', 
    nullable: true,
    description: 'Get a product by ID' 
  })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductType> {
    return this.productService.findOne(id);
  }

  /**
   * Get products by category ID
   * Challenge 1: productsByCategory query
   */
  @Query(() => [ProductType], { 
    name: 'productsByCategory',
    description: 'Get all products in a specific category' 
  })
  async getProductsByCategory(
    @Args('categoryId', { type: () => ID }) categoryId: string,
  ): Promise<ProductType[]> {
    const result = await this.productService.findAll({ categoryId });
    return result.data;
  }

  // ============================================
  // Mutations
  // ============================================

  /**
   * Create a new product
   * 
   * Using InputType for complex input with validation
   */
  @Mutation(() => ProductType, { 
    name: 'createProduct',
    description: 'Create a new product' 
  })
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<ProductType> {
    return this.productService.create({
      name: input.name,
      price: input.price,
      sku: input.sku,
      categoryId: input.categoryId,
      description: input.description,
      stock: input.stock ?? 0,
    });
  }

  // ============================================
  // Relation Field Resolver
  // ============================================

  /**
   * Resolve the category field for a Product
   * 
   * @ResolveField in code-first takes a function returning the type
   * This is called when client requests product.category
   * 
   * @Parent() gives us the parent Product object
   */
  @ResolveField(() => CategoryType, { 
    name: 'category',
    nullable: true,
    description: 'The category this product belongs to' 
  })
  async getCategory(@Parent() product: ProductType): Promise<CategoryType> {
    // Use categoryId from parent product to fetch the Category
    return this.categoryService.findOne(product.categoryId);
  }
}
