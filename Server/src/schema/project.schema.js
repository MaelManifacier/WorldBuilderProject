import {Project} from "../models/Project";
//Mock les data
//const dummy = require('mongoose-dummy');
//const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

/* OLD
type Project {
    _id: ID!
    name: String
    description: String
    tasks: [Task]
}
*/

export const typeDef = `

  type Project {
    _id : ID!
    name : String
    description : String
    charactersList : [Character]
    scenarii : [Scenario]
  }

  # à l'ajout, juste un projet "vide" -> juste nom et description
  input ProjectInput{
    name: String
    description: String
  }

  extend type Query {
    projectSchemaAssert: String
    projects: [Project]
    project(_id: ID!): Project
  }

  extend type Mutation {
    createProject(name: String!,description: String!): Boolean
    createProjectWithInput(input: ProjectInput!): Project
    deleteProject(_id: ID!): Boolean
    updateProject(_id: ID!,input: ProjectInput!): Project
    # addTaskToProject(_id: ID!,input: TaskInput!): Boolean
    addCharacterToProject(_id: ID!, input: CharacterInput!): Boolean
  }
`;

export const resolvers = {
  Query: {
    projectSchemaAssert: async () => {
      return "Project schema";
    },
    projects: async () => {
      /* Avec des 'dummy datas' :
      let projects = [];
      for (let index = 0; index < 5; index++) {
        projects.push(dummy(Project, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } */
      var projects = await Project.find().populate('characters')
      console.log(projects)
      return projects;
    },
    project: async (root, { _id }, context, info) => {
      /*return dummy(Project, {
        ignore: ignoredFields,
        returnDate: true
      })*/
      return await Project.findOne({_id}).populate('characters')
    },
  },
  Mutation: {
    createProject: async (root, args, context, info) => {
      await Project.create(args);
      return true;
    },
    createProjectWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Project.create(input);
    },
    deleteProject: async (root, { _id }, context, info) => {
      return Project.remove({ _id });
    },
    updateProject: async (root, { _id, input }) => {
      return Project.findByIdAndUpdate(_id, input, { new: true });
    },
    addCharacterToProject: async (root, { _id, input }) => {
      var character = await Character.create(input);
      var project = await Project.findByIdAndUpdate(_id,{
        $push: {
          characters: character
        }
      })
      console.log(character)
      console.log(project)
      project.save();
      return true;
    },
  },
};
