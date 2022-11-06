import { Body, Controller, Post } from "@nestjs/common";
import { AuthResponse } from "./dto/auth.response";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller('auth')
export class AuthController {

	@Post('register')
    // async register(@Body() dto: RegisterDto): Promise<AuthResponse> {
	async register(@Body() dto: RegisterDto){
        return null
	}

    @Post('login')
    // async login(@Body() dto: LoginDto): Promise<AuthResponse> {
    async login(@Body() dto: LoginDto){

    }

}

