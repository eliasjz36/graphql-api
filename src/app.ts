import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import config from 'config';

import resolvers from './resolvers';
import connectToMongo from './databases';
import { verifyJwt } from './utils/jwt';
import { User } from './schemas/user.schema';
import Context from './interfaces/context.interface';
import authChecker from './utils/authChecker';

const app = express();

const bootstrap = async () => {
	const schema = await buildSchema({
		resolvers,
		authChecker,
	});

	app.use(cookieParser());

	const server = new ApolloServer({
		schema,
		context: (ctx: Context) => {
			const accessToken = ctx.req.cookies.accessToken;

			if (accessToken) {
				const user = verifyJwt<User>(accessToken);

				ctx.user = user;
			}

			return ctx;
		},
		plugins: [
			process.env.NODE_ENV === 'production'
				? ApolloServerPluginLandingPageProductionDefault()
				: ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	});

	await server.start();

	server.applyMiddleware({ app });

	const port = config.get<string>('port');

	app.listen(port, () => {
		console.log(`App is listening on http://localhost:${4000}`);
	});

	connectToMongo();
};

bootstrap();

export default app;
