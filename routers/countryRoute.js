import express from "express";
const router = express.Router({ mergeParams: true });
import { getaddState, postaddState, Country, geteditState, posteditState } from "../controllers/countrycontroller.js";
import multer from "multer";
import path from "path";
import { allowRoles } from "../middleware/role.js";
import placeroute from "./placeRoute.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve("./public/state_thumbnail"));
    },
    filename: function (req, file, cb) {
        const filename = `${req.body.statename}-${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
});

const upload = multer({ storage });

router.get("/", Country);
router.get("/add_state", allowRoles('admin', 'editor'), getaddState);
router.post("/add_state", upload.single("statethumbnail"), postaddState);
router.get("/edit_state/:statename", allowRoles('admin', 'editor'), geteditState);
router.post("/edit_state/:statename", upload.single("statethumbnail"), posteditState);

router.use("/:statename", placeroute);

export default router;