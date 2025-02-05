// Importer le tableau dans le fichier salutations.model.js
import { salutations } from '../models/salutations.model.js';

// Fonction pour retourner toutes les salutations
const getSalutations = (req, res) => {
    res.json(salutations)
};

const getSalutationAleatoire = (req, res) => {
    const { langue } = req.query;
    let filteredSalutations = salutations;
    
    if (langue) {
        filteredSalutations = salutations.filter(salutation => salutation.code_langue === langue);

        if (filteredSalutations.length === 0) {
            return res.status(404).json({ message: `Erreur, le code de langue ${langue} n'existe pas`});
        }
    }
    const randomSalutation = filteredSalutations[Math.floor(Math.random() * filteredSalutations.length)]
    res.json(randomSalutation);
};

const ajouterNouvelleSalutation = (req, res) => {
    const { code_langue, langue, message } = req.body;

    if (!code_langue || !langue || !message) {
        return res.status(400).json({ message: "Erreur, les paramètres code_langue, langue et message sont obligatoires"});
    }

    const nouvelleSalutation = { code_langue, langue, message };
    ajouterSalutation(nouvelleSalutation);
    res.json({ message: "Salutation ajoutée", salutation: nouvelleSalutation });
};

export { getSalutations, getSalutationAleatoire, ajouterNouvelleSalutation };