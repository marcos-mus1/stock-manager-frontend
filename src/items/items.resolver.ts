import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/udpate-item.dto';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemService: ItemsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemDto) {
    return this.itemService.create(createItemInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemDto) {
    return this.itemService.update(updateItemInput.id, updateItemInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.remove(id);
  }
}
