import express from "express";
const router = express.Router();
import { showblogcreatinpage, aftercreatingBlog } from "../controllers/addblogcontroller.js";
import multer from "multer";
import path from "path";
import { allowRoles } from "../middleware/role.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve("./public/blogs_coverphoto"));
    },
    filename: function (req, file, cb) {
        const filename = `${req.body.title}-${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
});

const upload = multer({ storage });

router.get("/", allowRoles('admin', 'editor'), showblogcreatinpage);
router.post("/", upload.single("coverphoto"), aftercreatingBlog);

export default router;