import { Router } from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', login);
router.get('/logout', logout);

export default router;


// validateLoginInput