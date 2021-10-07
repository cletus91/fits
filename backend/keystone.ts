import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
	withItemData,
	statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { passwordResetEmail } from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations/index';

const databaseURL =
	process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360,
	secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	// eslint-disable-next-line @typescript-eslint/indent
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		// TODO: Add in initial roles here
	},
	passwordResetLink: {
		async sendToken(args) {
			console.log(args);
			await passwordResetEmail(args.token, args.identity);
		},
	},
});

export default withAuth(
	config({
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			},
		},
		db: {
			adapter: 'mongoose',
			url: databaseURL,
			async onConnect(keystone) {
				console.log('Connected to DB');
				if (process.argv.includes('--seed-data')) {
					await insertSeedData(keystone);
				}
			},
			//  TODO: Add data seeing here
		},
		lists: createSchema({
			//   Schema items go here
			User,
			Product,
			ProductImage,
			CartItem,
		}),
		extendGraphqlSchema,
		ui: {
			//   TODO: Change this for roles
			isAccessAllowed: ({ session }) => {
				console.log(session);
				return !!session?.data;
			},
		},
		session: withItemData(statelessSessions(sessionConfig), {
			User: 'id',
		}),
	})
);
