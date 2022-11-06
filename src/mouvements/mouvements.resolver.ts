import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMouvementDto } from './dto/create-mouvement.dto';
import { UpdateMouvementDto } from './dto/update-mouvement.dto';
import { Mouvement } from './entities/mouvement.entity';
import { MouvementsService } from './mouvements.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => Mouvement)
export class MouvementsResolver {
  constructor(private readonly mouvementService: MouvementsService) {}

  @Mutation(() => Mouvement)
  createMouvement(
    @Args('createMouvementInput') createMouvementInput: CreateMouvementDto,
  ) {
    return this.mouvementService.create(createMouvementInput);
  }

  @Query(() => [Mouvement], { name: 'Mouvements' })
  findAll() {
    return this.mouvementService.findAll();
  }

  @Query(() => Mouvement, { name: 'Mouvement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mouvementService.findOne(id);
  }

  @Mutation(() => Mouvement)
  updateMouvement(
    @Args('updateMouvementInput') updateMouvementInput: UpdateMouvementDto,
  ) {
    return this.mouvementService.update(
      updateMouvementInput.id,
      updateMouvementInput,
    );
  }

  @Mutation(() => Mouvement)
  removeMouvement(@Args('id', { type: () => Int }) id: number) {
    return this.mouvementService.remove(id);
  }
}
