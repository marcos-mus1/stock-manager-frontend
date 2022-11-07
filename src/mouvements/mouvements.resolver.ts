import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMouvementDto } from './dto/create-mouvement.dto';
import { UpdateMouvementDto } from './dto/update-mouvement.dto';
import { Mouvement } from './entities/mouvement.entity';
import { MouvementsService } from './mouvements.service';

@Resolver(() => Mouvement)
export class MouvementsResolver {
  constructor(private readonly mouvementService: MouvementsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Mouvement)
  createMouvement(
    @Args('createMouvementInput') createMouvementInput: CreateMouvementDto,
  ) {
    return this.mouvementService.create(createMouvementInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Mouvement], { name: 'mouvements' })
  findAll() {
    return this.mouvementService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Mouvement, { name: 'mouvement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mouvementService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Mouvement)
  updateMouvement(
    @Args('updateMouvementInput') updateMouvementInput: UpdateMouvementDto,
  ) {
    return this.mouvementService.update(
      updateMouvementInput.id,
      updateMouvementInput,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Mouvement)
  removeMouvement(@Args('id', { type: () => Int }) id: number) {
    return this.mouvementService.remove(id);
  }
}
