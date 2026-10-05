import {Router} from 'express';import {checkEligibility} from '../controllers/eligibilityController.js';const r=Router();r.post('/check',checkEligibility);export default r;
