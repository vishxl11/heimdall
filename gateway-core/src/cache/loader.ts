import { ADMIN_API_URL } from '../common/config.js'
import { setRoute } from './route.cache.js';

export async function loadRoutes(){

const response=await fetch(`${ADMIN_API_URL}/internal/routes`) ;

const { routes } = await response.json()

for (const route of routes) {
    setRoute(route)
}

}