import mongoose from 'mongoose';
import config from 'config';

const connectToMongo = async () => {
	try {
		await mongoose.connect(config.get('mongodbUri'));

		console.log('Connected to MongoDB');
	} catch (error) {
		console.log(error);

		process.exit(1);
	}
};

export default connectToMongo;
