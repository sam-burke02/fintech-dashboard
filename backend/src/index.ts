import express from 'express';
import authRoutes from './routes/auth';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
    res.send('Welcome to the Fintech API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
