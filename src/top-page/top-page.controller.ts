import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HhService } from '../hh/hh.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Controller('top-page')
export class TopPageController {
	constructor(
		private readonly topPageService: TopPageService,
		private readonly hhService: HhService,
		private readonly scheduleRegistry: SchedulerRegistry
		){}

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id')id: string){
		const deletePage = this.topPageService.deleteById(id)
		if(!deletePage) throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
		return deletePage
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	@UsePipes(new ValidationPipe())
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

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async test() {
		const data = await this.topPageService.findForHhUpdate(new Date());
		for (let page of data) {
			const hhData = await this.hhService.getData(page.category);
			page.hh = hhData;
			await this.topPageService.updateById(page._id, page);
		}
	}
}
