import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  // Get all users
  getUsers(): User[] {
    return this.users;
  }

  // Get a user by ID
  getUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  // Create a new user
  createUser(input: CreateUserInput): User {
    const newUser: User = { id: Date.now().toString(), 
      ...input };
    this.users.push(newUser);
    return newUser;
  }

  // Update a user
  updateUser(id: string, input: CreateUserInput): User {
    const user = this.getUser(id);
    if (!user) throw new Error('User not found');
    Object.assign(user, input);
    return user;
  }

  // Delete a user
  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }
}
