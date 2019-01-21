import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Profile } from './entity/Profile';
import { IResolvers } from './types/schema';

const typeDefs = `
  type User {
    id: Int!
    firstName: String!
    profile: Profile
  }

  type Profile {
    favoriteColor: String!
  }

  type Query {
    hello(name: String): String!
    user(id: Int!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(firstName: String!, profile: ProfileInput ): User!
    updateUser(id: Int!, firstName: String!): Boolean
    deleteUser(id: Int!): Boolean
  }

  input ProfileInput {
    favoriteColor: String!
  }
`;

const resolvers: IResolvers = {
  Query: {
    hello: (_, { name }) => `hello ${name || 'World'}`,
    user: async (_, { id }) => {
      const user = await User.findOne({ id }, { relations: ['profile'] });
      console.log(user);
      if (user === undefined) {
        throw new Error(); // throw apollo error?
      }
      return user;
    },
    users: () => User.find({ relations: ['profile'] })
  },
  Mutation: {
    createUser: async (_, args) => {
      const profile = Profile.create({ ...args.profile });
      await profile.save();
      const user = User.create({
        firstName: args.firstName,
        profileId: profile.id
      });
      user.profile = profile;
      await user.save();
      console.log(user);
      return user;
    },
    updateUser: (_, { id, ...args }) => {
      try {
        User.update({ id }, { ...args });
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    deleteUser: (_, { id }) => {
      try {
        User.delete({ id });
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers: resolvers as any });

createConnection().then(() => {
  server.start(() => console.log('Server is running on localhost:4000'));
});
