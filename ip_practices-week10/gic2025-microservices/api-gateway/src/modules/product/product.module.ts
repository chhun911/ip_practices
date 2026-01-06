import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    // Register both Product and Category repos
    // Product service needs Category repo to verify categoryId exists
    DatabaseModule.forFeature([Product, Category]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
