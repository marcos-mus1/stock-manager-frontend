import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  refNumber: string;

  @IsNotEmpty()
  @Field(() => Number)
  stock: number;

  @IsNotEmpty()
  @Field(() => Number)
  alertStock: number;
}
