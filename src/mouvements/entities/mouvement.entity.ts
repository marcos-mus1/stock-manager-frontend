import { Field, ObjectType } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { AbstractEntity } from 'src/shared/database/abstract.entity';
import { Vehicule } from 'src/vehicules/entities/vehicule.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'mouvements' })
@ObjectType()
export class Mouvement extends AbstractEntity {
  @Column({ nullable: false })
  @Field(() => String)
  date: string;

  @Column({ nullable: false })
  @Field(() => String)
  mouvement: string;

  @Column({ nullable: false })
  @Field(() => Number)
  quantity: number;

  @ManyToOne(() => Item, (item: Item) => item.mouvements)
  @Field(() => Item)
  item: Item;

  @ManyToOne(() => Vehicule, (vehicule: Vehicule) => vehicule.mouvements)
  @Field(() => Vehicule)
  vehicule: Vehicule;
}
