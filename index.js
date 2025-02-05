import express from 'express';
import morgan from 'morgan';
import salutationsRoutes from './src/routes/salutations.route.js';

const app = express();

app.use(express.json());
app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr
}));
app.use(morgan('combined', {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout
}));

app.get('/api', (req, res) => {
    res.send('Bienvenue à l\'API');
});

app.use('/api/salutations', salutationsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
