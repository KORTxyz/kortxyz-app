// Import the framework and instantiate it
import Fastify from 'fastify'

import cors from '@fastify/cors'

import ogcapi from '@kortxyz/ogcapi-gpkg'

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
        keywords: ["example"]
    },
}
})
await fastify.register(cors)

await fastify.register(ogcapi, {
  baseurl: process.env.BASEURL,
  gpkg: process.env.GPKG, 
  skipLandingpage: false
});

// Run the server!
try {
  await fastify.listen({ port: 3000, host:'0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}