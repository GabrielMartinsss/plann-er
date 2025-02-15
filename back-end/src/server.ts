import fastify from "fastify";
import cors from "@fastify/cors"
import { createTripe } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify()

// enquanto em dev '*' faz com que qualquer front-end possa consumir nosso back-end
// TODO: em produção, temos que trocar '*' pela url do nosso front-end, para restringir o acesso ao nosso back-end
app.register(cors, {
  origin: '*' 
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(createTripe)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server running!')
})