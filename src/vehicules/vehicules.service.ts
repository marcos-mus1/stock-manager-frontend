import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Vehicule } from './entities/vehicule.entity';

@Injectable()
export class VehiculesService {
  constructor(
    @InjectRepository(Vehicule)
    private readonly vehiculeRepository: Repository<Vehicule>,
  ) {}
  async create(createVehiculeInput: CreateVehiculeDto): Promise<Vehicule> {
    const Vehicule = this.vehiculeRepository.create(createVehiculeInput);

    return await this.vehiculeRepository.save(Vehicule);
  }

  async findAll(): Promise<Array<Vehicule>> {
    return await this.vehiculeRepository.find({
      relations: ['mouvements'],
    });
  }

  async findOne(id: number): Promise<Vehicule> {
    const client = await this.vehiculeRepository.findOne({
      where: [{ id }],
      relations: ['mouvements'],
    });
    if (!client) {
      throw new NotFoundException(`Vehicule #${id} not found`);
    }
    return client;
  }

  async update(
    id: number,
    updateVehiculeInput: UpdateVehiculeDto,
  ): Promise<Vehicule> {
    const vehiculeToUpdate = await this.vehiculeRepository.preload({
      id,
      ...updateVehiculeInput,
    });

    return this.vehiculeRepository.save(vehiculeToUpdate);
  }

  async remove(id: number): Promise<Partial<Vehicule>> {
    const Vehicule = await this.vehiculeRepository.findOneBy({
      id,
    });
    if (!Vehicule) {
      throw new NotFoundException(`Vehicule #${id} not found`);
    }
    await this.vehiculeRepository.remove(Vehicule);
    return {
      id,
    };
  }
}
