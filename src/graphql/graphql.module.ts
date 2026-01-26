import { Module } from '@nestjs/common';

// Schema-First Resolvers
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

// Code-First Resolvers (uncomment when using code-first approach)
// import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';
// import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';

// Import existing modules that provide services
import { CategoryModule } from '../modules/category/category.module';
import { ProductModule } from '../modules/product/product.module';

@Module({
  imports: [
    // Import the modules so their services are available
    CategoryModule,
    ProductModule,
  ],
  providers: [
    // ============================================
    // Schema-First Resolvers (Part A)
    // ============================================
    CategoryResolver,
    ProductResolver,

    // ============================================
    // Code-First Resolvers (Part B)
    // Uncomment these and comment out the above
    // when switching to code-first approach
    // ============================================
    // CategoryCodeFirstResolver,
    // ProductCodeFirstResolver,
  ],
})
export class GraphqlModule {}
