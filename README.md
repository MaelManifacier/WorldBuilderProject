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
	Pour voir les query et mutations à tester, voir le readme.md présent dans le dossier Server
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

- Character :
	getAll ?
	mutation createCharacter (avec un projectId)


###Client :
- formulaire de login qui envoie le login et mdp et reçoit une auth avec userId, token et tokenExpiration
- formulaire de register ?

- formulaire d'ajout de projet
- listing des projets


A VOIR :
le formulaire de register
