import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/shared/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User extends AbstractEntity {
  @Column({ name: 'first_name', nullable: false })
  @Field(() => String)
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  @Field(() => String)
  lastName: string;

  @Column({ nullable: false, unique: true })
  @Field(() => String)
  email: string;

  @Column({ nullable: false })
  @Field(() => String)
  password: string;

  @Column({ nullable: false, default: false })
  @Field(() => Boolean)
  isAdmin: boolean;
}
