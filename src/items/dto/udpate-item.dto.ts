import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { CreateItemDto } from './create-item.dto';

@InputType()
export class UpdateItemDto extends PartialType(CreateItemDto) {
  @Field(() => Int)
  id: number;
}
