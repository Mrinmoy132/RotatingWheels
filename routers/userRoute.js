import express from "express";
const router = express.Router();
import {homeview, getsignup, postsignup, getsignin, postsignin, getlogout} from "../controllers/usercontroller.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve("./public/profile_photo"));
    },
    filename: function (req, file, cb) {
        const filename = `${req.body.fullname}-${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
});

const upload = multer({ storage });

router.get("/", homeview);


router.get("/createaccount", getsignup);
router.post("/createaccount", upload.single("profileImageUrl"), postsignup);

router.get("/login", getsignin);
router.post("/login", postsignin);

router.get("/logout", getlogout);


export default router;