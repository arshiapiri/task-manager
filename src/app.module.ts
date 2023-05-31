import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigAppModule } from './config.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigAppModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "eza3810421",
      database: "sample2",
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ]
})
export class AppModule {}
