import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUnique } from './common/validators/IsUnique';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './redisOptions';

@Module({
  imports: 
    [
      ConfigModule.forRoot({ isGlobal: true }),
      UsersModule,
      AuthModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        entities: [User],
        synchronize: true
      }),
      RabbitMQModule.forRoot({
        exchanges: [{
          name: 'auth',
          type: 'direct'
        }],
        uri: process.env.RABBITMQ_URL as string,
        connectionInitOptions: { wait: true }
      }),
      CacheModule.registerAsync(RedisOptions)
    ],
  controllers: [AppController],
  providers: [AppService, IsUnique]
})
export class AppModule {}
