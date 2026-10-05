import {Router} from 'express';import {getProfile,saveProfile} from '../controllers/userController.js';const r=Router();r.get('/profile',getProfile);r.put('/profile',saveProfile);export default r;
