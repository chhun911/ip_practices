import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPO')
    private readonly productRepo: Repository<Product>,
    @Inject('CATEGORY_REPO')
    private readonly categoryRepo: Repository<Category>,
  ) {}

  /**
   * Create a new product
   */
  async create(dto: CreateProductDto): Promise<Product> {
    // Verify category exists
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new BadRequestException(
        `Category with ID "${dto.categoryId}" does not exist`,
      );
    }

    // Check if SKU already exists
    const existingSku = await this.productRepo.findOne({
      where: { sku: dto.sku },
    });

    if (existingSku) {
      throw new ConflictException(`Product with SKU "${dto.sku}" already exists`);
    }

    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  /**
   * Find all products with optional filtering and pagination
   */
  async findAll(query: QueryProductDto): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { categoryId, minPrice, maxPrice, page = 1, limit = 10 } = query;

    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    // Apply filters
    if (categoryId) {
      qb.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    // Get total count
    const total = await qb.getCount();

    // Apply pagination
    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    // Order by name
    qb.orderBy('product.name', 'ASC');

    const data = await qb.getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Find a single product by ID
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  /**
   * Find a product by SKU
   */
  async findBySku(sku: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { sku },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with SKU "${sku}" not found`);
    }

    return product;
  }

  /**
   * Update a product
   */
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // If updating categoryId, verify it exists
    if (dto.categoryId && dto.categoryId !== product.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new BadRequestException(
          `Category with ID "${dto.categoryId}" does not exist`,
        );
      }
    }

    // If updating SKU, check for duplicates
    if (dto.sku && dto.sku !== product.sku) {
      const existingSku = await this.productRepo.findOne({
        where: { sku: dto.sku },
      });

      if (existingSku) {
        throw new ConflictException(
          `Product with SKU "${dto.sku}" already exists`,
        );
      }
    }

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  /**
   * Remove a product
   */
  async remove(id: string): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return { message: `Product "${product.name}" has been deleted` };
  }
}
