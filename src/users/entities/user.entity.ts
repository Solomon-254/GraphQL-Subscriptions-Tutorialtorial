import { ObjectType, Field, ID } from '@nestjs/graphql';



// @ObjectType() defines the structure of your GraphQL response, just like an entity does in REST APIs
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;
}
