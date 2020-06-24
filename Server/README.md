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

> npm install bcrypt

// génération des token utilisateur
> npm install jsonwebtoken

middleware ? https://www.apollographql.com/docs/apollo-server/integrations/middleware/
// middleware -> pour ajouter des infos à la requête (pour authentification)
> npm install apollo-server-express

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

query getAllCharacters {
  characters{
    _id
    name
    firstName
    birthDate
    birthPlace
    livingPlace
    gender
    size
    corpulence
    traits
    faults
    activities
    characteristics
    past
    aims
    family {
      _id
    }
    projectID
  }
}


# authentification
query auth {
  login (mail: "mail@gmail.com", password: "password") {
    userId
    token
    tokenExpiration
  }
}

Réponse :
{
  "data": {
    "login": {
      "userId": "5ee3cc5124b880219c7bb60f",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWUzY2M1MTI0Yjg4MDIxOWM3YmI2MGYiLCJtYWlsIjoibWFpbEBnbWFpbC5jb20iLCJpYXQiOjE1OTIxNDY2OTUsImV4cCI6MTU5MjE1MDI5NX0.mIfbVMajm-cKAtmheC78htuRGJdHysjcHi3eM_4XImQ",
      "tokenExpiration": 1
    }
  }
}



- - -

AJOUT :

mutation createUserWithInput{
  createUserWithInput( input : {pseudo: "pseudo", password: "password", mail: "mail@gmail.com"}) {
    _id
    pseudo
    mail
  }
}

mutation createUser {
  createUser(pseudo: "lePseudo", password: "lePassword", mail: "leMail@gmail.com") {
    _id
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

mutation createCharacter {
    createCharacter(name: "NamePerso", firstName: "FirstnamePerso", birthDate:"01/01/2020", birthPlace: "ici", livingPlace: "pas beaucoup plus loin", 
      gender: "F", size: 150, corpulence: "fat", past: "hier j'ai mangé des nouilles", projectID: "5ee670361261f824d0b3c59f") 
    {
        _id
        name
        firstName
        birthDate
        birthPlace
        livingPlace
        gender
        size
        corpulence
        past
        projectID
    }
}

mutation deleteProject {
  deleteProject(_id: "5ed7d098b908833738430dd9") {}
}

mutation deleteUser {
  deleteUser(_id: "5ee37f5f6551f92958aea197") {}
}

mutation deleteCharacter {
  deleteCharacter(_id: "5ef37a7c11e3fc4640fdde77")
}



LES REQUETES QUI NE FONCTIONNENT PAS :

mutation createUser {
  createUser(pseudo: "unPseudo", password: "leMotDePasse", mail: "leMail@gmail.com") {
    pseudo
    mail
  }
}

mutation addProjectToUser {
  addProjectToUser(_id: "5ed7ce331e7ea628bca195ca", project: {name: "leProjet", description: "uneDescription yes", userID: "5ed7ce331e7ea628bca195ca"} ) {
    pseudo
    mail
    projects {
      _id
    }
  }
}

