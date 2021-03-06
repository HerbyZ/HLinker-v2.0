import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LinksModule } from './links/links.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
      }),
    }),
    AuthModule,
    LinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
