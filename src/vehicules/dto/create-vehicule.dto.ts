import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateVehiculeDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
