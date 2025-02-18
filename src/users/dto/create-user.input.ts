// src/user/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';



// @InputType() is used for input types, representing the structure of the data sent to the GraphQL API (e.g., data sent in a mutation)
@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;
}
