import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;

  @IsBoolean()
  @Field(() => Boolean)
  isAdmin: boolean;
}
