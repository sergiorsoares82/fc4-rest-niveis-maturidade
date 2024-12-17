import { Router } from 'express';
import jwtAuthRoutes from './jwt-auth.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/jwt', jwtAuthRoutes);
routes.use('/users', userRoutes);

export default routes;
