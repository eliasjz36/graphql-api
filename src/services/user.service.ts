import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import Context from '../interfaces/context.interface';
import { CreateUserInput, LoginInput, UserModel } from '../schemas/user.schema';
import { signJwt } from '../utils/jwt';

class UserService {
	async createUser(input: CreateUserInput) {
		return UserModel.create(input);
	}

	async login(input: LoginInput, context: Context) {
		const user = await UserModel.find().findByEmail(input.email).lean();
		const errorMessage = 'Invalid email or password';

		if (!user) {
			throw new ApolloError(errorMessage);
		}
		const passwordIsValid = await bcrypt.compare(input.password, user.password);

		if (!passwordIsValid) {
			throw new ApolloError(errorMessage);
		}

		const token = signJwt(user);

		context.res.cookie('accessToken', token, {
			maxAge: 3.154e10, // 1 year
			httpOnly: true,
			domain: 'localhost',
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
		});

		return token;
	}
}

export default UserService;
