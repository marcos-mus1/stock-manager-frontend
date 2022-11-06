import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { MouvementsModule } from './mouvements/mouvements.module';
import { VehiculesModule } from './vehicules/vehicules.module';
import { Item } from './items/entities/item.entity';
import { Mouvement } from './mouvements/entities/mouvement.entity';
import { User } from './users/entities/user.entity';
import { Vehicule } from './vehicules/entities/vehicule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_EXPIRATION: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('PGDATABASE'),
          host: config.get<string>('PGHOST'),
          port: Number(config.get<string>('PGPORT')),
          username: config.get<string>('PGUSER'),
          password: config.get<string>('PGPASSWORD'),
          entities: [Item, Mouvement, User, Vehicule],
          synchronize: true,
          // synchronize: config.get<boolean>('SYCHRONIZE'),
        };
      },
    }),
    AuthModule,
    UsersModule,
    ItemsModule,
    MouvementsModule,
    VehiculesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
