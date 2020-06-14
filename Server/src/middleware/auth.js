// pour vérifier que le client est connecté et 'laisser passer' ou non la requête
module.exports = (req, res, next) => {
    // voir si il y a un champ 'Authorization' dans la requête
    const authHeader = req.get('Authorization ');
    if (!authHeader) {
        // s'il n'y en n'a pas on ajoute une info pour les resolvers, pour dire que l'on n'est pas co
        req.isAuth = false;
        // on laisse passer
        return next();
    }
    // on split pour ne pas avoir Authorization:
    // il va nous rester Bearer etLeToken
    // donc on prend juste le token avec l'index 1
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }

    // on vérifie le token (on lui donne la secretKey que l'on a utilisé dans user.schema.js pour le créer)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, '18FZ8hrFYR/f423gTE');
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    // on avait mis le userId dans le token à la création
    req.userId = decodedToken;
    return next();
}
