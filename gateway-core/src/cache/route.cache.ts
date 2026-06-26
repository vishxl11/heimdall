import type { Route } from "../types/route.js";



const RouteMap: Map<string,Route>=new Map() ;


export function setRoute(route:Route)
{
    const key=`${route.method}:${route.path}` ;

    const value:Route=route
    
    RouteMap.set(key,value) ;
} 


export function getRoute(path:string,method:string)
{
     const key=`${method}:${path}` ;

     const routeValue=RouteMap.get(key) ;

     return routeValue ;
}

export function deleteRoute(routeId:string)
{
    for (const [key, route] of RouteMap) {
    if (route.routeId === routeId) {
        RouteMap.delete(key)
        break
      }
    }
}

