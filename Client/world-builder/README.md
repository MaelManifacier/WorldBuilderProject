This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> npm install
    yarn install

App.js : premier composant de l'application
index.js : main file that contains the ReactDOM

Dossiers :
apollo-boost : pour set up apollo client
react-apollo : layer integration for react
graphql : parse les queries graphql


Service worker : 
    public/sw.js
    (doc MDN : https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API)


Ajout du router :
> yarn add react-router-dom

Routes :
http://localhost:3000 : page d'accueil du site web / de l'application - présentation de l'application et liens vers connection / authentification

/projects : contiendra la liste des projets pour un utilisateur connecté


- - -


Pages actuelles (à compléter) dans components :

/common/HomePage.js -> accueil de l'appli, user non authentifié

/navigation/Navbar.js -> future navbar
    Sidebar.js -> s'ouvrira au clic sur bouton de la navbar


/project/AddProjectPage.js
    DetailProjectPage.js
    ProjectsHomePage.js

/user/Login.js
    UserHome.js


- - -


Actuellement :
https://github.com/pipic1/Cour-LP-Transverse-Client/tree/client-4-graphql/my-app

Pour le scroll :


- - -

> npm install @material-ui/core @material-ui/icons

https://zamarrowski.github.io/react-ionicons/
> npm install --save react-ionicons

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
