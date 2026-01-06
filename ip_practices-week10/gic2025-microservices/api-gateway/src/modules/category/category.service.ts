import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPO')
    private readonly categoryRepo: Repository<Category>,
  ) {}

  /**
   * Create a new category
   */
  async create(dto: CreateCategoryDto): Promise<Category> {
    // Check if category with same name already exists
    const existing = await this.categoryRepo.findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(
        `Category with name "${dto.name}" already exists`,
      );
    }

    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  /**
   * Find all categories
   */
  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find({
      order: { name: 'ASC' },
    });
  }

  /**
   * Find a single category by ID
   */
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return category;
  }

  /**
   * Update a category
   */
  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    // If updating name, check for duplicates
    if (dto.name && dto.name !== category.name) {
      const existing = await this.categoryRepo.findOne({
        where: { name: dto.name },
      });

      if (existing) {
        throw new ConflictException(
          `Category with name "${dto.name}" already exists`,
        );
      }
    }

    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  /**
   * Remove a category
   * Note: Will fail if products exist with this category (due to RESTRICT)
   */
  async remove(id: string): Promise<{ message: string }> {
    const category = await this.findOne(id);

    // Check if category has products
    if (category.products && category.products.length > 0) {
      throw new ConflictException(
        `Cannot delete category "${category.name}" because it has ${category.products.length} product(s). Delete or reassign the products first.`,
      );
    }

    await this.categoryRepo.remove(category);
    return { message: `Category "${category.name}" has been deleted` };
  }
}
