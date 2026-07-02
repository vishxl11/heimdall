import dotenv from 'dotenv'
dotenv.config() ;

export const REDIS_URL=process.env.REDIS_URL! ;
export const ADMIN_API_URL=process.env.ADMIN_API_URL! ;
export const OTEL_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT!
export const SERVICE_NAME = process.env.SERVICE_NAME!

