import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/udpate-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}
  async create(createItemInput: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemInput);

    return await this.itemRepository.save(item);
  }

  async findAll(): Promise<Array<Item>> {
    return await this.itemRepository.find({
      relations: ['mouvements'],
    });
  }

  async findOne(id: number): Promise<Item> {
    const client = await this.itemRepository.findOne({
      where: [{ id }],
      relations: ['mouvements'],
    });
    if (!client) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return client;
  }

  async update(id: number, updateItemInput: UpdateItemDto): Promise<Item> {
    const itemToUpdate = await this.itemRepository.preload({
      id,
      ...updateItemInput,
    });

    return this.itemRepository.save(itemToUpdate);
  }

  async remove(id: number): Promise<Partial<Item>> {
    const item = await this.itemRepository.findOneBy({
      id,
    });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    await this.itemRepository.remove(item);
    return {
      id,
    };
  }
}
