import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { response } from "express";
import { IdValidationPipe } from "../pipes/ad-validation.pipe";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { PRODUCT_NOT_FOUND_ERROR } from "./product.constants";
import { ProductModel } from "./product.model";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController{
	constructor(private readonly productService: ProductService ){}

	@Post('create')
	async create(@Body() dto: CreateProductDto){
		return this.productService.create(dto)
	}

	@Get(':id')
    async findById(@Param('id', IdValidationPipe) id: string){
		const product = await this.productService.findById(id);
		if(!product){
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		}
		return this.productService.findById(id)
	}

	@Delete(':id')
    async deleteById(@Param('id', IdValidationPipe)id: string){
		const deletedProduct = await  this.productService.deleteById(id)
		if(!deletedProduct){
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return id;
	}

	@Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.updateById(id, dto);
		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
    async findWithReviews(@Body() dto: FindProductDto){
		return this.productService.findWithReviews(dto)
	}
}