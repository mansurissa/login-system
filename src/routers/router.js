import { Router } from 'express';
import welcome from '../controllers/welcome';
import userRouter from './userRouter';

const router = Router();

router.get('/', welcome);
router.use('/users', userRouter);
export default router;
