import Express  from "express";
import colors from 'colors';
import morgan from "morgan";
import env from "dotenv";
import connectDB from './config/config.js';
import pizzaRoute from './routes/pizzaRoutes.js';
import userRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoute.js';

env.config();

const app = Express();
const port = process.env.PORT || 3002;

connectDB();

app.use(Express.json());
app.use(morgan('dev'));

//route
app.use('/api/pizzas',pizzaRoute);
app.use('/api/users',userRoute);
app.use('/api/orders',orderRoute);

app.get("/",(req, res)=>{;

    res.send("Welcome to the Home Page.");
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`.bgMagenta.white);
})
