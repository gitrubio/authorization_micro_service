import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middlewares';

const router = Router();

router.post('/signin',[checkDuplicateUsernameOrEmail,checkRolesExisted], authCtrl.signIn);
router.post('/signup', authCtrl.signUp);


export default router;