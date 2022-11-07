import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Vehicule } from './entities/vehicule.entity';
import { VehiculesService } from './vehicules.service';

@Resolver(() => Vehicule)
export class VehiculesResolver {
  constructor(private readonly vehiculeService: VehiculesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Vehicule)
  createVehicule(
    @Args('createVehiculeInput') createVehiculeInput: CreateVehiculeDto,
  ) {
    return this.vehiculeService.create(createVehiculeInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Vehicule], { name: 'vehicules' })
  findAll() {
    return this.vehiculeService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Vehicule, { name: 'vehicule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vehiculeService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Vehicule)
  updateVehicule(
    @Args('updateVehiculeInput') updateVehiculeInput: UpdateVehiculeDto,
  ) {
    return this.vehiculeService.update(
      updateVehiculeInput.id,
      updateVehiculeInput,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Vehicule)
  removeVehicule(@Args('id', { type: () => Int }) id: number) {
    return this.vehiculeService.remove(id);
  }
}
