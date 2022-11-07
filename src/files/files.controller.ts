import { Controller, HttpCode, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from './dto/files-elment.respons'
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
	constructor(
		private readonly filesService: FilesService
	) { }

	@Post('upload')
	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		return this.filesService.saveFiles([file]);
	}
}
