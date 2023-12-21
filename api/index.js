import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import stripePackage from 'stripe';
const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongo db disconnected");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.errorMessage || "Something went wrong!";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// =========================payment=====================

const stripe = stripePackage(process.env.STRIPE_PRIVATE_KEY);

app.post('/create-checkout-session', async (req, res) => {
  const YOUR_DOMAIN = 'http://localhost:3001'; // Replace this with your front-end URL
  const {priceItem} = req.body;
  // const priceItem = 25;
  console.log(req);
  console.log(priceItem);
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'HotelBooking',
            },
            unit_amount: priceItem, // Replace with the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // console.log
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/failure`,
    });
  
  
    res.json({ url:session.url});

  }catch(error){
    res.status(500).json({error:error.message});
  }
});



// =============================payment close==================

app.listen(8800, () => {
  connect();
  console.log("connected to backend!+-");
});
