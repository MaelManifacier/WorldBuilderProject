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
    login(pseudo: String!, password: String!): String!
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
      return await User.find().populate('projects') //.exec()
    },
    // Get user by ID
    user: async (root, { _id }, context, info) => {
      return User.findOne({ _id });
    }
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
      input.token = Buffer.from(input.pseudo).toString('base64');
      return User.create(input);
    },
    // https://mongoosejs.com/docs/populate.html#populate_multiple_documents
    // voir à "Refs to children"
    addProjectToUser: async (root, {_id, input}, context, info) => {
      let user = await User.findOne({_id});
      console.log(user)
      let project
      try {
        project = await Project.create(input);
      } catch(e) {
        return e.message;
      }
      //let project = await Project.findOne({userID : _id});
      if (project != null) {
        user.projects.push(project);
      }
      /*var project1 = await Project.findByIdAndUpdate(project._id,{
        $push: {
          projects: project1
        }
      })*/
      console.log(project)
      user.save();
      return user;
    },
    deleteUser: async (root, { _id }, context, info) => {
      return User.remove({ _id });
    },
    updateUser: async (root, { _id, input }) => {
      return User.findByIdAndUpdate(_id, input, { new: true });
    },
    // la fonction login doit retourner le token utilisateur
    login: async(root, { pseudo, password }, context, info) => {
      let user = User.findOne({pseudo, password});
      return user.token;
    }
  }
};
