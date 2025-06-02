import express from "express";
import path from "path";
import { connectDB } from "./model/connectToDB.js";
import dotenv from "dotenv";
import userRoute from "./routers/userRoute.js"
import addblogRoute from "./routers/addblogRoute.js"
import allblogRoute from "./routers/allblogRoute.js"
import countryRoute from "./routers/countryRoute.js"
import contactRoute from "./routers/contactRoute.js"
// import CountryRoute from "./routers/countryRoute.js"
import cookieParser from "cookie-parser";
import {authenticateToken} from "./middleware/authenticateTokenmiddleware.js"
import { homeview } from "./controllers/usercontroller.js";
// import { biography } from "./controllers/biocontroller.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB(process.env.MONGODB_URL);

app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticateToken("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", homeview);
// app.get("/bio", biography);
app.use("/explore/:countryname", countryRoute);
app.use("/all_blogs", allblogRoute);
app.use("/add_blog", addblogRoute);
app.use("/contact", contactRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));