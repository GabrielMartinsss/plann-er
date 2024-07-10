import fastify from "fastify";
import cors from "@fastify/cors"
import { createTripe } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";

const app = fastify()

// enquanto em dev '*' faz com que qualquer front-end possa consumir nosso back-end
// TODO: em produção, temos que trocar '*' pela url do nosso front-end, para restringir o acesso ao nosso back-end
app.register(cors, {
  origin: '*' 
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTripe)
app.register(confirmTrip)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})