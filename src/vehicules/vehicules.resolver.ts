import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Vehicule } from './entities/vehicule.entity';
import { VehiculesService } from './vehicules.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => Vehicule)
export class VehiculesResolver {
  constructor(private readonly vehiculeService: VehiculesService) {}

  @Mutation(() => Vehicule)
  createVehicule(
    @Args('createVehiculeInput') createVehiculeInput: CreateVehiculeDto,
  ) {
    return this.vehiculeService.create(createVehiculeInput);
  }

  @Query(() => [Vehicule], { name: 'Vehicules' })
  findAll() {
    return this.vehiculeService.findAll();
  }

  @Query(() => Vehicule, { name: 'Vehicule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vehiculeService.findOne(id);
  }

  @Mutation(() => Vehicule)
  updateVehicule(
    @Args('updateVehiculeInput') updateVehiculeInput: UpdateVehiculeDto,
  ) {
    return this.vehiculeService.update(
      updateVehiculeInput.id,
      updateVehiculeInput,
    );
  }

  @Mutation(() => Vehicule)
  removeVehicule(@Args('id', { type: () => Int }) id: number) {
    return this.vehiculeService.remove(id);
  }
}
