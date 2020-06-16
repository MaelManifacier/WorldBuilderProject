import React from 'react'

// le contexte sera wrappé autour du main dans App.js
// (je suppose qu'on peut donner différents contextes aux différentes parties de l'application en wrappant autour de différents objets)
export default React.createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});