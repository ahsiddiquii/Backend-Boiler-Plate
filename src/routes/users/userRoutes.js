import { Router } from "express";
import { userRegister } from "../../controllers/users/registerUser.controller.js";
import { upload } from "../../middlewares/multer.middleware.js"
import { loginUser } from "../../controllers/users/loginUser.controller.js";
import { logoutUser } from "../../controllers/users/logoutUser.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../../controllers/users/refreshAccessToken.controller.js";
import { changeUserPassword } from "../../controllers/users/changeUserPassword.controller.js";
import { currentUser } from "../../controllers/users/currentLoggedInUser-Pass-RefreshToken.controller.js";
import { updateUserInfo } from "../../controllers/users/updateUserInfo.controller.js";
import { updateUserAvatar } from "../../controllers/users/updateUserAvatar.controller.js";
import { updateUserCoverImage } from "../../controllers/users/updateUserCoverImage.controller.js";

const router = Router();

router.route("/register").post(
    // For file upload handling from frontend:
    upload.fields(
        [{
            name: "avatar",
            maxCount: 1
        },
        {
            name: 'coverImage',
            maxCount: 1
        }]
    ),
    userRegister);
router.route("/login").post(loginUser);

// Secured routes:
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-access-token").post(refreshAccessToken);
router.route("/change-user-password").post(verifyJWT, changeUserPassword);
router.route("/currentUser").post(verifyJWT, currentUser);
router.route("/update-user-info").post(verifyJWT, updateUserInfo);
router.route("/update-user-avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/update-user-coverImage").post(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

export default router;