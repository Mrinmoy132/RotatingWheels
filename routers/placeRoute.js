import express from "express";
const router = express.Router({ mergeParams: true });
import { individualState, getaddPlace, postaddPlace, geteditPlace, posteditPlace, showindividualPlace } from "../controllers/placecontroller.js";
import multer from "multer";
import path from "path";
import { allowRoles } from "../middleware/role.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve("./public/place_thumbnail"));
    },
    filename: function (req, file, cb) {
        const filename = `${req.body.placename}-${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
});

const upload = multer({ storage });

router.get("/", individualState);
router.get("/add_place", allowRoles('admin', 'editor'), getaddPlace);
router.post("/add_place", upload.single("placethumbnail"), postaddPlace);

router.get("/edit_place/:placeID", allowRoles('admin', 'editor'), geteditPlace);
router.post("/edit_place/:placeID", upload.single("placethumbnail"), posteditPlace);

router.get("/:placeID", showindividualPlace);

export default router;