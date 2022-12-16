import express from 'express';
import connect from './utils/connect';

import adminRouter from './routes/admin.route';

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/api/admin', adminRouter);


app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);

    await connect();

});