import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { CreateMouvementDto } from './create-mouvement.dto';

@InputType()
export class UpdateMouvementDto extends PartialType(CreateMouvementDto) {
  @Field(() => Int)
  id: number;
}
