import { createRouter, defineEventHandler } from "h3";
import { submitForm, getFormSubmissions } from "../handlers/forms";

const router = createRouter();

router.post("/submit", defineEventHandler(submitForm));
router.get("/submissions", defineEventHandler(getFormSubmissions));

export default router;
