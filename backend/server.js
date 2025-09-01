const express = require("express");
const app = express();
require("dotenv").config();
require('./models/db')
const AuthRouter = require('./Routes/Authrouter')
const ExpenseRouter = require('./Routes/ExpenseRouter')
const cors = require("cors");
const ensureAutheniticated = require("./middleware/Auth");
const PORT=process.env.PORT || 8080

app.get('/hi',(req,res)=>{
    res.send('hello');
})

app.use(express.json());
app.use(cors());

app.use('/auth',AuthRouter)
app.use('/expenses',ensureAutheniticated,ExpenseRouter )


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})