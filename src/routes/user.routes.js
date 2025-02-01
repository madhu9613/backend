import { Router } from "express"
import { logoutUser, registerUser ,refreshAccessToken,loginUser} from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
// import { logoutUser } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router=Router()


//adding middle ware before registration such that i can upload images...
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1

        }
    ]),
    
    registerUser)

    router.route("/login").post(loginUser)


    //secured routes
    router.route("/logout").post(verifyJWT,  logoutUser)
    router.route("/refresh-token").post(refreshAccessToken)

export default router

