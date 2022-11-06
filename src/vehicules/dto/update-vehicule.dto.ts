import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { CreateVehiculeDto } from './create-vehicule.dto';

@InputType()
export class UpdateVehiculeDto extends PartialType(CreateVehiculeDto) {
  @Field(() => Int)
  id: number;
}
