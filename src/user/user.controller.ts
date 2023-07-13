import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Request, Response } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  async login(@Req() req: any, @Res() res: Response) {
    return await this.userService.loginWithGoogle(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(
    @Query('redirect_uri') redirectUri: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return res
      .cookie('jwt', req.cookies['jwt'] ?? '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
        domain: 'localhost:3000',
      })
      .redirect(302, redirectUri ? redirectUri : req.headers.referer);
  }
}
