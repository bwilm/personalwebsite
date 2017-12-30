import * as express  from 'express';
import categories from "../controllers/categories.ctrl";
import posts from '../controllers/posts.ctrl';
import users from '../controllers/users.ctrl';
import logout from '../controllers/users.ctrl';


let router = express.Router();
router.use('/users',users);
router.use('/categories',categories);
router.use('/posts',posts);
router.use('/logout',logout);


export default router ;

