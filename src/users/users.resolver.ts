// src/user/user.resolver.ts
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly pubSub: PubSub,
    // @Inject('PUB_SUB') private readonly pubSubInstance: PubSub, // if you need to inject a custom or dynamic provider using a string token.
  ) {}

  // Query to fetch all users
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  // Query to fetch a user by ID
  @Query(() => User) //only fetches
  async getUser(@Args('id') id: string): Promise<User> { //@Args is used ton extract data eg id from the GraphQL request object similar to Params in Rest
    return this.userService.getUser(id);
  }

  // Mutation to create a new user
  @Mutation(() => User) //modifies the data
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(input);
    this.pubSub.publish('userCreated', { userCreated: user }); //publishing subrciption events is normally done in mutations. 
    return user;
  }


  // Subscription to listen for user creation
  @Subscription(() => User, {  //(() => User): This is a GraphQL type definition that indicates that the subscription will return a User object.
                              //  User is the GraphQL ObjectType that you defined earlier, and this tells GraphQL that when the subscription is triggered, the data returned will be of type User
    resolve: (value) => value.userCreated,
  })
  userCreated() {
    return this.pubSub.asyncIterableIterator('userCreated');
  }

  //The resolve function is a custom resolver to map the incoming event data (value) to the field you're interested in—in this case, userCreated.
// value represents the event payload (e.g., the data passed when the event is emitted).
// So, when the userCreated event is triggered, this resolver ensures that the data returned is mapped to userCreated, which might look something like this:

// Each subscriber is only listening to their specific event, so if they subscribe to userCreated, they will only receive the userCreated data,
//  even though the published event includes both userCreated and postCreated.

  // Mutation to update a user
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: CreateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(id, input);
  }

  // Mutation to delete a user
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
