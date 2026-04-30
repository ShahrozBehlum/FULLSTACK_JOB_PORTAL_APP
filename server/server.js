import './src/config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dbConnect from './src/config/db.js';
import * as Sentry from "@sentry/node"
import companyRoutes from './src/routes/company.routes.js'
import connectCloundinary from './src/config/cloudinary.js';
import jobRoutes from './src/routes/job.routes.js'
import userRoutes from './src/routes/user.routes.js'

//Initialize Express
const app = express();

//Port
const port = process.env.PORT || 5000;

//DB Connection
dbConnect();
await connectCloundinary()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get("/", (req, res) => res.send('API Working'));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`The Server is running at Port: ${port}!`);
})
