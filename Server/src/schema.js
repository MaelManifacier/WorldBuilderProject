import { makeExecutableSchema } from 'graphql-tools';

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

import {
    typeDef as User,
} from './schema/user.schema';

import {
    typeDef as Character,
} from './schema/character.shema';

import {
    typeDef as FamilyMember,
} from './schema/familyMember.schema';

import {
    typeDef as Project,
} from './schema/project.schema';

import {
    typeDef as Scenario,
} from './schema/scenario.schema';

import {
    typeDef as Step,
} from './schema/step.schema';

export const schema = makeExecutableSchema({
    typeDefs : [Query, User, Character, FamilyMember, Project, Scenario, Step],
    
})