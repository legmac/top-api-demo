import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};

const getMongoString = (configService: ConfigService) =>
	configService.get('MONGO_URL');

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});