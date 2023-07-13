import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly sequelize: Sequelize,
    private readonly jwtService: JwtService,
  ) {
    this.sequelize.addModels([User]);
  }
  async loginWithGoogle(req, res) {
    // test
    console.log(req.user);

    // 소셜로그인 확인
    if (!req.user) {
      return `No user from google`;
    }

    // req에서 유저정보를 받아옴(name, email, accessToken, refreshToken)
    const user = req.user;

    // user 정보 db에 담기
    const [created] = await this.userModel.findOrCreate({
      where: {
        id: user.snsId,
      },
      defaults: {
        googleId: user.data[0].id,
        googleDisplayName: user.name,
        email: user.data[0].email,
        googleAccessToken: user.accessToken,
        googleRefreshToken: user.refreshToken,
      },
    });

    if (!created) {
      await this.userModel.update(
        {
          googleDisplayName: user.name,
          googleAccessToken: user.accessToken,
          googleRefreshToken: user.refreshToken,
        },
        {
          where: {
            googleId: user.snsid,
          },
        },
      );
    }

    // user 정보를 이용해 JWT를 생성한다.
    const token = this.jwtService.sign({
      id: user.snsId,
      user_name: user.name,
      accessToken: user.accessToken,
    });

    // JWT를 이용해 로그인 처리를 한다.
    const cookie = `jwt=${token}; Max-Age=7200; HttpOnly; Path=/; SameSite=Strict; Secure; Domain=localhost:3000`;
    res.setHeader('Set-Cookie', cookie);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');

    // redirect
    res.redirect('https://localhost:3000');
  }

  async verifyJwt(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      return null;
    }
  }

  async validateUser(payload: any) {
    const user = await this.userModel.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUserToken(id: number, accessToken: string, refreshToken: string) {
    await this.userModel.update(
      {
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
      },
      {
        where: {
          googleId: id,
        },
      },
    );
  }
}
