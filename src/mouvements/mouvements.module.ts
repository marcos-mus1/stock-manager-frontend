import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from 'src/items/items.module';
import { Mouvement } from './entities/mouvement.entity';
import { MouvementsResolver } from './mouvements.resolver';
import { MouvementsService } from './mouvements.service';

@Module({
  imports: [ItemsModule, TypeOrmModule.forFeature([Mouvement])],
  providers: [MouvementsResolver, MouvementsService],
  exports: [MouvementsService],
})
export class MouvementsModule {}
