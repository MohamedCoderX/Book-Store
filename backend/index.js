import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import cors from "cors";
import bookroute from "./routes/bookroute.js";
import orderroute from "./routes/orderroute.js";
import useroute from "./routes/useroute.js";
import adminroute from "./stats/adminstats.js"

//from .env file
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("Hello, World!");
    }
);
app.use("/uploads", express.static("uploads"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/books",bookroute);
app.use("/api/order",orderroute);
app.use("/api/auth",useroute);
app.use("/api/data",adminroute)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}
)
connectDb();