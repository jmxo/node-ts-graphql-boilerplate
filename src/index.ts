import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import { User } from './entity/User';
import { IResolvers } from './types/schema';
import * as express from 'express';
import * as session from 'express-session';

const SALT = 12;
const SESSION_SECRET = 'asdklfjqo31';

interface Context {
  req: Express.Request;
}

const resolvers: IResolvers<Context> = {
  Query: {
    hello: (_, { name }) => `hello ${name || 'World'}`,
    authHello: (_, __, { req }) => {
      if (req.session && req.session.userId) {
        return `Cookie found! Your id is: ${req.session.userId}`;
      } else {
        return 'Could not find cookie :(';
      }
    }
  },
  Mutation: {
    register: async (_, args, { req }) => {
      const password = await bcrypt.hash(args.password, SALT);

      const user = User.create({
        username: args.username,
        password
      });

      await user.save();

      if (req.session) {
        req.session.userId = user.id;
      }

      return true;
    }
  }
};

const PORT = 4000;

const app = express();

app.use(
  session({
    name: 'qid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

const typeDefs = importSchema(path.join(__dirname, './schema.graphql'));

const schema = makeExecutableSchema({ typeDefs, resolvers: resolvers as any });

const server = new ApolloServer({
  schema,
  context: ({ req }: { req: Express.Request }) => ({ req })
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: 'http://localhost:3000'
  }
});

createConnection().then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
  });
});
