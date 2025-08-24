import express from 'express'
import { login,signup } from '../controllers/user.controllers.js';

const Routes= express.Router();

Routes.post('/signup',signup);
Routes.post('/login',login);


export default Routes;