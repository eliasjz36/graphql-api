import { Mutation, Arg, Ctx, Authorized, Query } from 'type-graphql';

import Context from '../interfaces/context.interface';
import {
	CreateProductInput,
	GetProductInput,
	Product,
} from '../schemas/product.schema';
import ProductService from '../services/product.service';

class ProductResolver {
	constructor(private productService: ProductService) {
		this.productService = new ProductService();
	}

	@Authorized()
	@Mutation(() => Product)
	createProduct(
		@Arg('input') input: CreateProductInput,
		@Ctx() context: Context,
	) {
		const user = context.user!;

		return this.productService.createProduct({ ...input, user: user._id });
	}

	@Query(() => [Product])
	products() {
		return this.productService.findProducts();
	}

	@Query(() => Product)
	product(@Arg('input') input: GetProductInput) {
		return this.productService.findSingleProduct(input);
	}
}

export default ProductResolver;
