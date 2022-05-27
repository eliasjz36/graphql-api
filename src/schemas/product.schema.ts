import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { MinLength, MaxLength, Min, IsNumber } from 'class-validator';
import { customAlphabet } from 'nanoid';
import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from './user.schema';

const nanoid = customAlphabet('abcdefghijlmnopqrstuvwxyz123456789', 10);

@ObjectType()
@index({ productId: 1 })
export class Product {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true, ref: () => User })
	user: Ref<User>;

	@Field(() => String)
	@prop({ required: true, ref: () => User })
	name: string;

	@Field(() => String)
	@prop({ required: true })
	description: string;

	@Field(() => String)
	@prop({ required: true })
	price: string;

	@Field(() => String)
	@prop({ required: true, default: () => `product_${nanoid()}`, unique: true })
	productId: string;
}

export const ProductModel = getModelForClass<typeof Product>(Product);

@InputType()
export class CreateProductInput {
	@Field()
	name: string;

	@MinLength(50, {
		message: 'Description must be at least 50 characters long',
	})
	@MaxLength(100, {
		message: 'Description must not be longer than 100 characters',
	})
	@Field()
	description: string;

	@IsNumber()
	@Min(1)
	@Field()
	price: number;
}

@InputType()
export class GetProductInput {
	@Field()
	productId: string;
}
