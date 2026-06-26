import { ADMIN_API_URL } from "../common/config.js";
import {SubscriberClient} from "../config/redis.js"
import { deleteRoute, setRoute } from "./route.cache.js";

export async function subscribe()
{
    await SubscriberClient.subscribe('heimdall:route-update',async (message)=>{

        const msg=JSON.parse(message) ;

        if(msg.action=='CREATED' || msg.action=='UPDATED')
        {
            const response=await fetch(`${ADMIN_API_URL}/internal/route/${msg.routeId}`)  ;
            const {route}=await response.json() ;
            setRoute(route) ;
        }
        else
        {
            deleteRoute(msg.routeId) ;
        }


    })
}