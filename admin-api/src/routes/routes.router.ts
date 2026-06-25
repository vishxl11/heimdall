import {Router} from 'express'
import { createRouteController, deleteRouteController, getRouteByIdController, getRoutesController, updateRouteController } from './routes.controller.js';
import { auth } from '../auth/auth.middleware.js';
import { validateSchema } from '../common/validate.middleware.js';
import { CreateRouteSchema, UpdateRouteSchema } from './routes.schema.js';

const adminRouter=Router() ;

adminRouter.post('/routes',auth,validateSchema(CreateRouteSchema),createRouteController) ;

adminRouter.get('/routes',auth,getRoutesController)

adminRouter.get('/routes/:id',auth,getRouteByIdController) ;

adminRouter.patch('/routes/:id',auth,validateSchema(UpdateRouteSchema),updateRouteController) ;

adminRouter.delete('/routes/:id',auth,deleteRouteController) ;


export default adminRouter;





