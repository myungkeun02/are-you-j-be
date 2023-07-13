import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutinesController } from './routines/routines.controller';
import { RoutinesModule } from './routines/routines.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PlansController } from './plans/plans.controller';
import { PlansModule } from './plans/plans.module';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsModule } from './statistics/statistics.module';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [
    RoutinesModule,
    UserModule,
    PlansModule,
    StatisticsModule,
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      timezone: 'Asia/Seoul',
      models: ['/**/*.entity{.ts,.js}'],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    RoutinesController,
    UserController,
    PlansController,
    StatisticsController,
  ],
  providers: [AppService, UserService],
})
export class AppModule {}
