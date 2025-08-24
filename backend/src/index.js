import express from 'express';
import Routes from './routes/user.routes.js';
import leadRoutes from './routes/lead.routes.js';
import { connectDB } from './lib/db.js';
const app= express();
const PORT= 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`Jai shree Ram, ${PORT}`);
});

app.use("/api/auth",Routes);
app.use("/leads",leadRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
