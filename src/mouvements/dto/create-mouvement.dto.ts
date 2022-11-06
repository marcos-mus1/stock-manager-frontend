import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMouvementDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  itemId: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  mouvement: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float)
  quantity: number;

  @IsNotEmpty()
  @Field(() => Number)
  vehiculeId: number;
}
