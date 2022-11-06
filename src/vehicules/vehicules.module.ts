import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicule } from './entities/vehicule.entity';
import { VehiculesResolver } from './vehicules.resolver';
import { VehiculesService } from './vehicules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicule])],
  providers: [VehiculesResolver, VehiculesService],
  exports: [VehiculesService],
})
export class VehiculesModule {}
