import express from "express";
import dbInit from "./db/init";

import router from "./Routes/task4.routes";

const port = 3088

const app = express();

app.use(express.json());
dbInit()
app.use('/',router)
app.get('/', (req,res) =>{
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });