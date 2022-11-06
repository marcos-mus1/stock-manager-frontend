import { Field, ObjectType } from '@nestjs/graphql';
import { Mouvement } from 'src/mouvements/entities/mouvement.entity';
import { AbstractEntity } from 'src/shared/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { status } from '../../@types/types';

@Entity({ name: 'vehicules' })
@ObjectType()
export class Vehicule extends AbstractEntity {
  @Column({ nullable: false })
  @Field(() => String)
  name: string;

  @Column({ default: 'active' })
  @Field(() => String, {
    nullable: true,
    description: "Just 2 values : 'active' | 'declutter'",
  })
  status: status;

  @OneToMany(() => Mouvement, (mouvement) => mouvement.vehicule)
  @Field(() => [Mouvement], { nullable: true })
  mouvements: Mouvement[];
}
