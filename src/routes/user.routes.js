import { Router } from "express";
import { storeDetails, getDetails } from "../controller/details.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/details").post(
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  storeDetails
);

router.route("/display").get(getDetails);

export default router;
