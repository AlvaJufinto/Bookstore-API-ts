import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const { scrapeProduct } = require('./scraper');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  scrapeProduct("https://www.tokopedia.com/lapakmusiman/cincin-pria-cowok-keren-titanium-silver-7?extParam=ivf%3Dfalse%26src%3Dsearch");
});
