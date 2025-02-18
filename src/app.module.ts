import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


@Module({

  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({ //code first approach
        driver: ApolloDriver,
        autoSchemaFile: 'src/graphql.schema.graphql', //specifies the path to the generated schema-used in code first, all modules schema generation is done automatically in here
        sortSchema: true, //sorts the schema lexicographically
        playground: false,  //disable the default playground
        plugins: [ApolloServerPluginLandingPageLocalDefault()], //enable the  Apollo GraphQL Playground 
        installSubscriptionHandlers: true, //This option enables the subscription handlers using the built-in subscriptions-transport-ws protocol.This is deprecated
        subscriptions: {
          'graphql-ws': true //This option enables the graphql-ws protocol, which is the newer, recommended protocol for GraphQL subscriptions.
        },
      }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
