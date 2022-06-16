import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { AtGuard, RtGuard } from './common/guards';

@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() dto: AuthDto): Promise<Tokens>{
      return   this.authService.signup(dto);
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() dto: AuthDto):Promise<Tokens> {
      return  this.authService.signin(dto);
    }

    @Post('signout')
    @HttpCode(HttpStatus.OK)
    async signout(@GetCurrentUserId() userId: string) {
     return   this.authService.signout(userId);
    }

    @Public ()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(
      @GetCurrentUserId() userId: string,
      @GetCurrentUser('refreshToken') refreshToken: string
    ) {
      return  this.authService.refresh(userId, refreshToken);
    }
}
