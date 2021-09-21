import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './schemas/link.schema';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
    UsersModule,
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
