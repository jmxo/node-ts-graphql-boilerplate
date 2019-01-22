import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { importSchema } from 'graphql-import';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import { User } from './entity/User';
import { IResolvers } from './types/schema';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

const SALT = 12;
const JWT_SECRET = 'aslkdfjaklsjdflk';

const typeDefs = importSchema(path.join(__dirname, './schema.graphql'));

interface Request extends express.Request {
  userId: number;
}

interface Context {
  req: Request;
  res: express.Response;
  userId: number;
}

const resolvers: IResolvers<Context> = {
  Query: {
    hello: (_, { name }) => `hello ${name || 'World'}`,
    authHello: (_, __, { userId }) => {
      if (userId) {
        return `Cookie found! Your id is: ${userId}`;
      } else {
        return 'Could not find cookie :(';
      }
    }
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

const PORT = 4000;

const app = express();

app.use('/graphql', cookieParser(), (req: any, _, next) => {
  try {
    const { userId }: any = jwt.verify(req.cookies.id, JWT_SECRET);
    req.userId = userId;
  } catch (err) {
    console.log(err);
  }
  return next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: Context) => ({
    res,
    userId: req.userId
  })
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
