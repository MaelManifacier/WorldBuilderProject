import { User } from "../models/User";
import { Project } from "../models/Project";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Mock des données :
//const dummy = require('mongoose-dummy');
//const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type User {
    _id: ID!
    pseudo: String!
    password: String!
    mail: String!
    projects: [Project]
  }

  input UserInput{
    pseudo: String!
    password: String!
    mail: String!
  }

  type UserLoginInfos {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  extend type Query {
    users: [User]
    user(_id: ID!): User
    userProjects(_id: ID!): [Project]
  }

  extend type Mutation {
    createUser(pseudo: String!, password: String!, mail: String!): User
    createUserWithInput(input: UserInput!): User
    addProjectToUser(_id: ID!, project: ProjectInput!): User
    deleteUser(_id: ID!): Boolean
    updateUser(_id: ID!,input: UserInput!): User
    login(mail: String!, password: String!): UserLoginInfos
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
    },
    userProjects: async(root, { _id }, context, info) => {
      const projects = await Project.find({ userID: _id }).exec();
      return projects;
    }
  },
  Mutation: {
    createUser: async (root, {pseudo, password, mail}, context, info) => {
      try {
        let user = new User({
          pseudo : pseudo,
          password : await bcrypt.hash(password, 10),
          mail : mail,
          //token : Buffer.from(pseudo).toString('base64')
        })
        //cryptPassword = await bcrypt.hash(password, 10);
        //token = Buffer.from(pseudo).toString('base64');
        let response = await User.create(user);
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
    login: async (root, { mail, password }, context, info) => {
      if (mail === "" || password === "") {
        throw new Error("Mail and password must not be empty");
      }
      // valider mail et password
      const user = await User.findOne({ mail: mail });
      if (!user) {
        throw new Error('unvalid credentials');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('unvalid credentials');
      }
      // create le token (dataQueLonVeutMettreDansLeToken, secretKey, tempsExpiration (optionnel))
      const token = await jwt.sign({userId: user._id, mail: user.mail}, '18FZ8hrFYR/f423gTE', {
        expiresIn: '1h'
      })
      // return le token à l'user
      return {userId: user.id, token: token, tokenExpiration: 1};
    }
  }
};
