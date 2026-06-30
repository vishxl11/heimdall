export enum RateLimitKey{
         USER_ID,
        API_KEY,
        IP
    }

type RateLimitType={
    id :string, 
    routeId :string ,
    limit: number ,
    windowSeconds: number,
    identifierType :RateLimitKey,
    createdAt :Date 
}

type CBtype={
    id :string  ,
    routeId: string ,
    failureThreshold: number,
    windowSeconds :number,
    openDurationSeconds :number,
    halfOpenMaxRequests :number,
    createdAt:Date
}

export type Route={
    adminId: string,
    routeId :string 
    path: string,
    upstreamURL: string,
    createdAt : Date ,
    method : string ,
    isActive :boolean ,
    RateLimitPolicies: RateLimitType ,
    circuitBreakerConfigs: CBtype 
}



