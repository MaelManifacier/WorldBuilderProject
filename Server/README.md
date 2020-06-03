### Server

- - -

📁 Model - Mongoose (Database)
     📃 User
     📃 Project
     📃 Character
     📃 Scenario
     📃 Step
     📃 FamilyMember
     
📁 Schema - GraphQL Schema ( Typedefs & Resolvers )
     📃 User.schema
     📃 Project.schema
     📃 Character.schema
     📃 Scenario.schema
     📃 Step.schema
     📃 FamilyMember.schema

- - -

Requêter le serveur :

mutation createUser {
  createUser(pseudo: "unPseudo", password: "leMotDePasse", mail: "leMail@gmail.com") {
    pseudo
    mail
  }
}

query getAllUsers {
  users{
    _id
    pseudo
    mail
    projects {
      _id
      name
      description
    }
  }
}

mutation addProjectToUser {
  addProjectToUser(_id: "5ed7ce331e7ea628bca195ca", project: {name: "leProjet", description: "uneDescription yes"} ) {
    pseudo
    mail
    projects {
      _id
    }
  }
}

