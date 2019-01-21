/* tslint:disable */
// THIS IS A GENERATED FILE, DO NOT EDIT!
// Generated in 2019-01-21T11:40:53+02:00
export type Maybe<T> = T | null;

export interface ProfileInput {
  favoriteColor: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  hello: string;

  user: User;

  users: User[];
}

export interface User {
  id: number;

  firstName: string;

  profile?: Maybe<Profile>;
}

export interface Profile {
  favoriteColor: string;
}

export interface Mutation {
  createUser: User;

  updateUser?: Maybe<boolean>;

  deleteUser?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface HelloQueryArgs {
  name?: Maybe<string>;
}
export interface UserQueryArgs {
  id: number;
}
export interface CreateUserMutationArgs {
  firstName: string;

  profile?: Maybe<ProfileInput>;
}
export interface UpdateUserMutationArgs {
  id: number;

  firstName: string;
}
export interface DeleteUserMutationArgs {
  id: number;
}

import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    hello?: HelloResolver<string, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;

    users?: UsersResolver<User[], TypeParent, Context>;
  }

  export type HelloResolver<R = string, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    HelloArgs
  >;
  export interface HelloArgs {
    name?: Maybe<string>;
  }

  export type UserResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    UserArgs
  >;
  export interface UserArgs {
    id: number;
  }

  export type UsersResolver<R = User[], Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<number, TypeParent, Context>;

    firstName?: FirstNameResolver<string, TypeParent, Context>;

    profile?: ProfileResolver<Maybe<Profile>, TypeParent, Context>;
  }

  export type IdResolver<R = number, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FirstNameResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ProfileResolver<
    R = Maybe<Profile>,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ProfileResolvers {
  export interface Resolvers<Context = {}, TypeParent = Profile> {
    favoriteColor?: FavoriteColorResolver<string, TypeParent, Context>;
  }

  export type FavoriteColorResolver<
    R = string,
    Parent = Profile,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    createUser?: CreateUserResolver<User, TypeParent, Context>;

    updateUser?: UpdateUserResolver<Maybe<boolean>, TypeParent, Context>;

    deleteUser?: DeleteUserResolver<Maybe<boolean>, TypeParent, Context>;
  }

  export type CreateUserResolver<
    R = User,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CreateUserArgs>;
  export interface CreateUserArgs {
    firstName: string;

    profile?: Maybe<ProfileInput>;
  }

  export type UpdateUserResolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UpdateUserArgs>;
  export interface UpdateUserArgs {
    id: number;

    firstName: string;
  }

  export type DeleteUserResolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeleteUserArgs>;
  export interface DeleteUserArgs {
    id: number;
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = {}> {
  Query?: QueryResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Profile?: ProfileResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
