import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { CreateUserInput, LoginInput, User } from '../schemas/user.schema';
import UserService from '../services/user.service';
import Context from '../interfaces/context.interface';

@Resolver()
class UserResolver {
	constructor(private userService: UserService) {
		this.userService = new UserService();
	}

	@Mutation(() => User)
	createUser(@Arg('input') input: CreateUserInput) {
		return this.userService.createUser(input);
	}

	@Mutation(() => String) // return the jwt
	login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
		return this.userService.login(input, context);
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() context: Context) {
		return context.user;
	}
}

export default UserResolver;
