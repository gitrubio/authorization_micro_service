import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller';
import { verifyToken , IsModerator,IsAdmin,checkRolesExisted, checkDuplicateUsernameOrEmail} from '../middlewares';
const router = Router();


router.post('/', [verifyToken,IsAdmin,checkRolesExisted, checkDuplicateUsernameOrEmail],userCtrl.createUser);
export default router;


