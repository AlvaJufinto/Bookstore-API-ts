import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

import connect from './utils/connect';

import healthRoute from './routes/health.route';
import authRoute from './routes/auth.router';
import adminRoute from './routes/admin.route';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
	origin: "*",
	credentials : true
}))

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use('/api/', healthRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);

app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);

    await connect();

});

