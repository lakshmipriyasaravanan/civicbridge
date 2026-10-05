import {Router} from 'express';import {getSchemes,getSchemeById} from '../controllers/schemeController.js';const r=Router();r.get('/',getSchemes);r.get('/:id',getSchemeById);export default r;
