import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middlewares';

const router = Router();

router.post('/signin', authCtrl.signIn);
router.post('/signup',[checkDuplicateUsernameOrEmail,checkRolesExisted], authCtrl.signUp);


export default router;