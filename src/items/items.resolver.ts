import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/udpate-item.dto';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemDto) {
    return this.itemService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'Items' })
  findAll() {
    return this.itemService.findAll();
  }

  @Query(() => Item, { name: 'Item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemDto) {
    return this.itemService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.remove(id);
  }
}
