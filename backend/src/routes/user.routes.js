import express from 'express'
import { login,signup } from '../controllers/user.controllers.js';
import { Router } from 'express';
const UserRouter= Router();

UserRouter.post('/signup',signup);
UserRouter.post('/login',login);


export default UserRouter;