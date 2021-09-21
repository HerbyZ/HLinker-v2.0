import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLinkDto } from './dto/create-link.dto';
import { FilterLinksDto } from './dto/filter-links.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link, LinkDocument } from './schemas/link.schema';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<LinkDocument>,
  ) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const createProps = {
      ...createLinkDto,
      shortUrl: await this.generateShortUrl(),
    };

    return await this.linkModel.create(createProps);
  }

  async findAll(filterLinksDto?: FilterLinksDto): Promise<Link[]> {
    return await this.linkModel.find(filterLinksDto).exec();
  }

  async findById(id: string): Promise<Link> {
    return await this.linkModel.findById(id);
  }

  async update(id: string, updateLinkDto: UpdateLinkDto): Promise<Link> {
    return await this.linkModel.findOneAndUpdate({ id }, updateLinkDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Link> {
    return await this.linkModel.findOneAndDelete({ id });
  }

  async followLink(shortUrl: string): Promise<string> {
    const link = await this.linkModel.findOne({ shortUrl });
    await link.updateOne({ followCount: link.followCount + 1 });

    return link.originalUrl;
  }

  private async generateShortUrl(): Promise<string> {
    function generate(): string {
      return (Math.random() + 1).toString(36).substring(7);
    }

    let url = generate();
    let candidate = await this.linkModel.findOne({ shortUrl: url });
    while (candidate) {
      url = generate();
      candidate = await this.linkModel.findOne({ shortUrl: url });
    }

    return url;
  }
}
