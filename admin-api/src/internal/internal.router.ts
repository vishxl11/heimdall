import { Router } from "express";
import { getRouteByIdInternal,getRoutesInternal } from "./internal.controller.js";

const internalRouter=Router() ;

internalRouter.get('/routes',getRoutesInternal) ;

internalRouter.get('/route/:id',getRouteByIdInternal) ;

export default internalRouter ;