import salutationsModel from '../models/salutations.model.js';

const getSalutations = async (req, res) => {
    try {
        const salutations = await salutationsModel.getTableauSalutation();
        if (!salutations || salutations.length === 0) {
            res.status(404).send({
                message: `Salutations introuvables`
            });
            return;
        }
        res.send(salutations);
    } catch (error) {
        res.status(500).send({
            message: `Erreur serveur: ${error.message}`
        });
    }
};


const getSalutationAleatoire = async (req, res) => {
    const { langue } = req.query;
    let filteredSalutations = await salutationsModel.obtenirSalutationAleatoire(langue);
    
    if (filteredSalutations.length === 0) {
        return res.status(404).json({ message: `Erreur, le code de langue ${langue} n'existe pas`});
    }
    const randomSalutation = filteredSalutations[Math.floor(Math.random() * filteredSalutations.length)]
    res.json(randomSalutation);
};

const ajouterNouvelleSalutation = async (req, res) => {
    const { code_langue, langue, message } = req.body;

    if (!code_langue || !langue || !message) {
        return res.status(400).json({ message: `Erreur, les paramètres code_langue, langue et message sont obligatoires. Valeurs reçues : ${JSON.stringify({ code_langue, langue, message })}` });
    }

    const nouvelleSalutation = { code_langue, langue, message };

    try {
        await salutationsModel.ajouterSalutations(code_langue, langue, message);
        res.json({ message: "Salutation ajoutée", salutation: nouvelleSalutation });
    } catch (error) {
        res.status(500).json({ message: `Erreur serveur: ${error.message}` });
    }
};

export { getSalutations, getSalutationAleatoire, ajouterNouvelleSalutation };