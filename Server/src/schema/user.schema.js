import {User} from "../models/User";
import { Project } from "../models/Project";
// Mock des données :
//const dummy = require('mongoose-dummy');
//const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type User {
    _id: ID!
    pseudo: String
    password: String
    mail: String
    token: String
    projects: [Project]
  }

  input UserInput{
    pseudo: String
    password: String
    mail: String
    token: String
  }

  extend type Query {
    users: [User]
    user(_id: ID!): User
  }

  extend type Mutation {
    createUser(pseudo: String!, password: String!, mail: String!): User
    createUserWithInput(input: UserInput!): User
    addProjectToUser(_id: ID!, project: ProjectInput!): User
    deleteUser(_id: ID!): Boolean
    updateUser(_id: ID!,input: UserInput!): User
  }
`;

export const resolvers = {
  Query: {
    // Get all users
    users: async () => {
      /*
      let users = [];
      for (let index = 0; index < 5; index++) {
        users.push(dummy(User, {
          ignore: ignoredFields,
          returnDate: true
        }))
      }
      return users;*/
      return await User.find({}).exec()
    },
    // Get user by ID
    user: async (root, { _id }, context, info) => {
      return User.findOne({ _id });
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      try {
        let response = await User.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    },
    createUserWithInput: async (root, { input }, context, info) => {
      input.password = await bcrypt.hash(input.password, 10);
      return User.create(input);
    },
    addProjectToUser: async (root, {_id, input}, context, info) => {
      let user = await User.findOne({_id})
      let project = await Project.create(input, {
        $push: {
          projects: project
        }
      })
      /*var project = await Project.findByIdAndUpdate(_id,{
        $push: {
          projects: project
        }
      })*/
      console.log(project)
      console.log(user)
      user.save();
      return user;
    },
    deleteUser: async (root, { _id }, context, info) => {
      return User.remove({ _id });
    },
    updateUser: async (root, { _id, input }) => {
      return User.findByIdAndUpdate(_id, input, { new: true });
    }
  }
};
