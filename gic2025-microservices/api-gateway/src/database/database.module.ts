import { DynamicModule, Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './database.constants';

type DbOptions = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities?: any[];
};

@Global() // Makes this module available everywhere without explicit imports
@Module({})
export class DatabaseModule {
  /**
   * forRoot() - Sets up the main database connection
   * Use this once in AppModule to establish the PostgreSQL connection
   */
  static forRoot(options: DbOptions): DynamicModule {
    const dataSourceProvider = {
      provide: DATA_SOURCE,
      useFactory: async () => {
        const ds = new DataSource({
          type: 'postgres',
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,
          entities: options.entities || [],
          // Disable synchronize here since TypeORM root module handles it
          // This avoids deadlock when both try to create tables simultaneously
          synchronize: false,
          logging: ['error', 'warn'],
        });

        return ds.initialize();
      },
    };

    return {
      module: DatabaseModule,
      providers: [dataSourceProvider],
      exports: [dataSourceProvider],
    };
  }

  /**
   * forFeature() - Registers repositories for specific entities
   * Use this in feature modules to get access to entity repositories
   * 
   * @param entities - Array of entity classes to create repositories for
   * @returns DynamicModule with repository providers
   * 
   * Example usage:
   *   DatabaseModule.forFeature([Category, Product])
   * 
   * This creates providers like:
   *   - CATEGORY_REPO
   *   - PRODUCT_REPO
   */
  static forFeature(entities: any[]): DynamicModule {
    const repoProviders = entities.map((entity) => ({
      provide: `${entity.name.toUpperCase()}_REPO`,
      useFactory: (ds: DataSource) => ds.getRepository(entity),
      inject: [DATA_SOURCE],
    }));

    return {
      module: DatabaseModule,
      providers: repoProviders,
      exports: repoProviders,
    };
  }
}
