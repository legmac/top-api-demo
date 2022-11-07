import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { response } from 'express';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService){}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTopPageDto){
		return this.topPageService.create(dto)
	}

	@Get(':id')
	async get(@Param('id') id: string){
		const page =  this.topPageService.findById(id)
		if(!page){
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
		}
		return page
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string){
		const page = this.topPageService.findByAlias(alias)
		if(!page) throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
		return page
	}

	@Delete(':id')
	async delete(@Param('id')id: string){
		const deletePage = this.topPageService.deleteById(id)
		if(!deletePage) throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
		return deletePage
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto){
		const updatedPage = this.topPageService.updateById(id, dto)
		if(!updatedPage) throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}

	@Get()
	async findAll() {
		return this.topPageService.findAll();
	}

}
