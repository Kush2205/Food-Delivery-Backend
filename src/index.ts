import express from 'express';
import MainRouter from "./routes/index"
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", MainRouter);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});