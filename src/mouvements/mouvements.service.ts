import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
import { CreateMouvementDto } from './dto/create-mouvement.dto';
import { UpdateMouvementDto } from './dto/update-mouvement.dto';
import { Mouvement } from './entities/mouvement.entity';

@Injectable()
export class MouvementsService {
  constructor(
    @InjectRepository(Mouvement)
    private readonly mouvementRepository: Repository<Mouvement>,
    private readonly itemService: ItemsService,
  ) {}
  async create(createMouvementInput: CreateMouvementDto): Promise<Mouvement> {
    const item = await this.itemService.findOne(createMouvementInput.itemId);
    const mouvement = this.mouvementRepository.create(createMouvementInput);
    mouvement.item = item;

    if (createMouvementInput.mouvement === 'entry') {
      await this.itemService.update(item.id, {
        stock: item.stock + createMouvementInput.quantity,
        id: item.id,
      });
    } else {
      await this.itemService.update(item.id, {
        stock: item.stock - createMouvementInput.quantity,
        id: item.id,
      });
    }

    return await this.mouvementRepository.save(mouvement);
  }

  async findAll(): Promise<Array<Mouvement>> {
    return await this.mouvementRepository.find({
      relations: ['item'],
    });
  }

  async findOne(id: number): Promise<Mouvement> {
    const mouvement = await this.mouvementRepository.findOne({
      relations: ['item'],
    });
    if (!mouvement) {
      throw new NotFoundException(`Mouvement #${id} not found`);
    }
    return mouvement;
  }

  async update(id: number, updateMouvementInput: UpdateMouvementDto) {
    const mouvement = await this.mouvementRepository.preload({
      id,
      ...updateMouvementInput,
    });
    if (!mouvement) {
      throw new NotFoundException(`Mouvement #${id} not found`);
    }
    return this.mouvementRepository.save(mouvement);
  }

  async remove(id: number) {
    const mouvement = await this.mouvementRepository.findOneBy({
      id,
    });
    if (!mouvement) {
      throw new NotFoundException(`Mouvement #${id} not found`);
    }
    await this.mouvementRepository.remove(mouvement);
    return {
      id,
    };
  }
}
