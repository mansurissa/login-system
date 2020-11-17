import { Router } from 'express';
import { create, getAll, login } from '../controllers/users';

const router = Router();
router.route('/').post(create).get(getAll);
router.route('/login').post(login);

export default router;
