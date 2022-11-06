import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RevireModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';

@Module({
	imports: [AuthModule, TopPageModule, ProductModule, RevireModule],
})
export class AppModule { }
