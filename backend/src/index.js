import express from 'express';
import Routes from './routes/user.routes.js';
import leadRoutes from './routes/lead.routes.js';
import { connectDB } from './lib/db.js';
import cors from "cors";
const app= express();
const PORT= 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // if sending cookies
}));

app.get('/', (req, res) => {
    res.send(`Jai shree Ram, ${PORT}`);
});

app.use("/api/auth",Routes);
app.use("/leads",leadRoutes);

const NODE_ENV= "development";
if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
