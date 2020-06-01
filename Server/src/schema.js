import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

// import des schemas et resolvers
import {
  typeDef as User,
  resolvers as userResolvers,
} from './schema/user.schema';

import {
  typeDef as Project,
  resolvers as projectResolvers,
} from './schema/project.schema';

import {
  typeDef as Character,
  resolvers as characterResolvers,
} from './schema/character.schema';

import {
  typeDef as Scenario,
  resolvers as scenarioResolvers,
} from './schema/scenario.schema';

import {
  typeDef as Step,
  resolvers as stepResolvers,
} from './schema/step.schema';

import {
  typeDef as FamilyMember,
  resolvers as familyMemberResolvers
} from './schema/familyMember.schema';

// General query
const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [ Query, User, Project, Character, Scenario, Step, FamilyMember],
  resolvers: merge(resolvers, userResolvers, projectResolvers, characterResolvers, scenarioResolvers, stepResolvers, familyMemberResolvers)
});