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

GET :
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

query getAllProjects {
  projects{
    _id
    name
    description
    characters {
      name
    }
    userID
  }
}

mutation log {
  login (pseudo: "unPseudo", password: "leMotDePasse") {
    token
  }
}

- - -

AJOUT :
mutation createUser {
  createUser(pseudo: "unPseudo", password: "leMotDePasse", mail: "leMail@gmail.com") {
    pseudo
    mail
  }
}

mutation createProject {
  createProject(name: "unProjet", description: "laDescription", userID: "5ed7ce331e7ea628bca195ca") {
    _id
    name
    description
    userID
  }
}


mutation deleteProject {
  deleteProject(_id: "5ed7d098b908833738430dd9") {}
}



LES REQUETES QUI NE FONCTIONNENT PAS :

mutation addProjectToUser {
  addProjectToUser(_id: "5ed7ce331e7ea628bca195ca", project: {name: "leProjet", description: "uneDescription yes", userID: "5ed7ce331e7ea628bca195ca"} ) {
    pseudo
    mail
    projects {
      _id
    }
  }
}

