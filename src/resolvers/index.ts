import ProductResolver from './product.resolver';
import UserResolver from './user.resolver';

const resolvers = [UserResolver, ProductResolver] as const;

export default resolvers;
