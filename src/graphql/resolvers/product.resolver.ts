// ============================================
// Schema-First Product Resolver
// Part A: Schema-First GraphQL
// ============================================

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from '../../modules/product/product.service';
import { CategoryService } from '../../modules/category/category.service';

@Resolver('Product') // <-- matches schema type name
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  // ============================================
  // Queries
  // ============================================

  /**
   * Get all products
   * Query: products
   */
  @Query('products')
  async products() {
    // findAll returns paginated data, we need to extract the data array
    const result = await this.productService.findAll({});
    return result.data;
  }

  /**
   * Get a single product by ID
   * Query: product(id: ID!)
   */
  @Query('product')
  async product(@Args('id') id: string) {
    // GraphQL ID comes as string, but our service expects string (UUID)
    return this.productService.findOne(id);
  }

  /**
   * Get products by category ID
   * Query: productsByCategory(categoryId: ID!)
   */
  @Query('productsByCategory')
  async productsByCategory(@Args('categoryId') categoryId: string) {
    const result = await this.productService.findAll({ categoryId });
    return result.data;
  }

  // ============================================
  // Mutations
  // ============================================

  /**
   * Create a new product
   * Mutation: createProduct(...)
   */
  @Mutation('createProduct')
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('sku') sku: string,
    @Args('categoryId') categoryId: string,
    @Args('description') description?: string,
    @Args('stock') stock?: number,
  ) {
    return this.productService.create({
      name,
      price,
      sku,
      categoryId,
      description,
      stock: stock ?? 0,
    });
  }

  // ============================================
  // Relation Field Resolver
  // ============================================

  /**
   * Resolve the category field for a Product
   * This is called when client requests product.category
   * 
   * @ResolveField decorator tells NestJS this method
   * resolves a specific field on the parent type (Product)
   */
  @ResolveField('category')
  async category(@Parent() product: any) {
    // product is the parent object (the Product being queried)
    // We use categoryId from the product to fetch the related Category
    return this.categoryService.findOne(product.categoryId);
  }
}
