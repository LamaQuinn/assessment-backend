const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortuneMessage,addFortune,updateFortune,deleteFortune } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/get-fortune",getFortuneMessage)

app.post("/api/add-fortune",addFortune)
app.put("/api/update-fortune",updateFortune)
app.delete("/api/delete-fortune",deleteFortune)
app.listen(4000, () => console.log("Server running on 4000"));
