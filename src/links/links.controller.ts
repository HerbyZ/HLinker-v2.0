import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateLinkDto } from './dto/create-link.dto';
import { FilterLinksDto } from './dto/filter-links.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksService } from './links.service';
import { Link } from './schemas/link.schema';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLinkDto: CreateLinkDto): Promise<Link> {
    return await this.linksService.create(createLinkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param() filterLinksDto?: FilterLinksDto): Promise<Link[]> {
    return await this.linksService.findAll(filterLinksDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Link> {
    return await this.linksService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<Link> {
    return await this.linksService.update(id, updateLinkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Link> {
    return await this.linksService.delete(id);
  }
}
