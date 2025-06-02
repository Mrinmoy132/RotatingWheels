import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";
import { all_blogs, individualBlog, geteditBlog, posteditBlog, addComment} from "../controllers/allblogcontroller.js";
import { allowRoles } from "../middleware/role.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/blogs_coverphoto"));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
});
const upload = multer({ storage: storage });


router.get("/", all_blogs);
router.get("/:id", individualBlog);
router.get("/edit_blog/:id", allowRoles('admin', 'editor'), geteditBlog);
router.post('/edit_blog/:id', upload.single('coverphoto'), posteditBlog);
router.post('/:id/comment', addComment);

export default router;