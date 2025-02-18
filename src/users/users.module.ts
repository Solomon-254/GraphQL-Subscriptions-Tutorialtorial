import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [UserResolver, UsersService,
    { 
      provide: PubSub, useValue: new PubSub() },

      // {
      //   provide: 'PUB_SUB',// if you need to inject a custom or dynamic provider using a string token.
      //   useValue: new PubSub(),
      // },

  ],
})
export class UsersModule { }
