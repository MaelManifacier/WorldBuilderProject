# WorldBuilderProject

## Server :
dossier Server
Lancement :
> npm install
> npm start


## Client :
dossier Client/worldbuilder
Lancement :
> npm install
> npm start


## Fonctionnalités :

###Server :
	Pour voir les query et mutations directement à tester, voir le readme.md présent dans le dossier Server
- User :
	getAll
	getProjectsForUser
	mutation auth -> renvoie un userId, token et tokenExpiration (temps en h)
	mutation createUserWithInput
	mutation deleteUser

- Projects :
	getAll
	mutation createProject (avec un userId)
	mutation deleteProject
	getCharactersForProject
	getScenarioForProject

- Character :
	getAll
	mutation createCharacter (avec un projectId)
	mutation editCharacter
	mutation deleteCharacter

- Scenario :
	mutation createScenario (avec un projectId)


###Client :
- formulaire de login qui envoie le login et mdp et reçoit une auth avec userId, token et tokenExpiration
- formulaire de création de compte

- formulaire d'ajout de projet
- listing des projets
- listing des personnages d'un projet
- listing des scenarios d'un projet

- formulaire d'ajout de personnage
- formulaire d'ajout de scenario

- page de détail d'un personnage d'un projet

- 404


A VOIR :
connexion côté client
