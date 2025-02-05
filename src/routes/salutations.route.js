import express from 'express';
import { getSalutations, getSalutationAleatoire, ajouterNouvelleSalutation } from '../controllers/salutations.controller.js';

const router = express.Router();

router.get('/liste', getSalutations);
router.get('/', getSalutationAleatoire);
router.post('/', ajouterNouvelleSalutation);

export default router;