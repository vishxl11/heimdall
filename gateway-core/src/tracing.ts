import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTEL_ENDPOINT, SERVICE_NAME } from './common/config.js'

const exporter = new OTLPTraceExporter({
    url: `${OTEL_ENDPOINT}/v1/traces`
})

const sdk = new NodeSDK({
    serviceName: SERVICE_NAME,
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations()]
})

sdk.start()

export default sdk