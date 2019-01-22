import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import { importSchema } from 'graphql-import';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import { User } from './entity/User';
import { IResolvers } from './types/schema';
import { Response } from 'express';

const SALT = 12;
const JWT_SECRET = 'aslkdfjaklsjdflk';

const typeDefs = importSchema(path.join(__dirname, './schema.graphql'));

const resolvers: IResolvers<{ res: Response }> = {
  Query: {
    hello: (_, { name }) => `hello ${name || 'World'}`
  },
  Mutation: {
    register: async (_, args, { res }) => {
      const password = await bcrypt.hash(args.password, SALT);

      const user = User.create({
        username: args.username,
        password
      });

      await user.save();

      const token = jwt.sign(
        {
          userId: user.id
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('id', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      });

      return true;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers: resolvers as any,
  context: ({ response }) => ({ res: response })
});

createConnection().then(() => {
  server.start(
    {
      cors: {
        credentials: true,
        origin: 'http://localhost:3000'
      }
    },
    () => console.log('Server is running on localhost:4000')
  );
});
