import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { ProductResponseDto } from '../dtos/product/product-response.dto';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/product/get-product-by-id.use-case';
import { GetAllProductsUseCase } from '../../application/use-cases/product/get-all-products.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Product already exists' })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    try {
      const result = await this.createProductUseCase.execute(createProductDto);
      return ProductResponseDto.fromEntity(result.product);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean, description: 'Filter active products only' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filter by category' })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
    type: [ProductResponseDto],
  })
  async getAllProducts(
    @Query('activeOnly') activeOnly?: boolean,
    @Query('category') category?: string,
  ): Promise<{ products: ProductResponseDto[]; total: number }> {
    try {
      const result = await this.getAllProductsUseCase.execute({
        activeOnly: activeOnly === true,
        category,
      });
      
      return {
        products: ProductResponseDto.fromEntities(result.products),
        total: result.total,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    try {
      const result = await this.getProductByIdUseCase.execute({ id });
      return ProductResponseDto.fromEntity(result.product);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Conflict with existing product' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    try {
      const result = await this.updateProductUseCase.execute({
        id,
        ...updateProductDto,
      });
      return ProductResponseDto.fromEntity(result.product);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        if (error.message.includes('already exists')) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const result = await this.deleteProductUseCase.execute({ id });
      return { message: result.message };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}