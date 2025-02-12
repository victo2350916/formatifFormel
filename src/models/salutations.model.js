import db from '../config/db.js';

const getTableauSalutation = () => {
    return new Promise((resolve, reject) => {

        const requete = 'SELECT message FROM salutations';

        db.query(requete, (erreur, resultat) => {
            if (erreur) { 
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
                return
            }
            resolve(resultat);
        });
    });
};

const obtenirSalutationAleatoire = (code_langue) => {
    return new Promise((resolve, reject) => {

        const requete = "SELECT message FROM salutations WHERE code_langue = ?";
        const params = [code_langue];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
                return
            }
            resolve(resultat);
        });
    });
};

const ajouterSalutations = (code_langue, langue, message) => {
    return new Promise((resolve, reject) => {
        const requete = "INSERT INTO salutations (code_langue, langue, message) Values (? ,? ,?)";
        const params = [code_langue, langue, message];

        db.query(requete, params, (erreur, resultat) =>{
            if (erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
                return
            }
            resolve(resultat);
        });
    });
};

export default { 
    getTableauSalutation,
    obtenirSalutationAleatoire,
    ajouterSalutations
};