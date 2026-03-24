import { generateToken } from "../utils/jwt.js";
import User from "../model/user.model.js";
import { comaprePassword, hasedPassword } from "../utils/utils.js";
import { sendWelcomeEmail } from "../Emails/emailHandler.js";

export const register = async (req, res, next) => {

    try {

        const { userName, email, password } = req.body;
        console.log(req.body)
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(existingUser, "kam ho gya")
            return res.status(400).json({ message: "User already exists" });
        }

        const newUserData = {
            userName: String(userName),
            email: String(email),
            password: await hasedPassword(password)
        }



        const DB_response = await User.create(newUserData);

        const payload = {
            id: DB_response.id,
            email: DB_response.email,
            fullName: DB_response.userName

        }

        // try {

        //     await sendWelcomeEmail(DB_response.email, DB_response.userName, process.env.CLINT_URL)
        // }
        // catch (err) {
        // }

        if (DB_response) {
            generateToken(payload)
            res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: generateToken
            });
        } else {
            res.status(500).json({
                status: "failed",
                message: "Failed to create user"
            });
        }
    } catch (err) {
        res.status(401).json({
            status: "not work",
            messages: "web not work"
        })
        next(err);
    }
}

// export const login = async (req, res, next) => {

//     const { email, password } = req.body
//     try {
//         const user = await User.findOne({ email })
//         if (!user)
//             return res.status(400).json({
//                 message: "invalid credentials"
//             })

//         const isvalidPassword = await comaprePassword(
//             password,
//             user.password
//         )

//         if (!isvalidPassword) {
//             return res.status(400).json({
//                 message: "invalid credentials"
//             })
//         }
//         const access_token = generateToken({ id: user.id, name: user.userName })
//         res.cookie("token", access_token, {
//             httpOnly: true,
//             secure: false,      // localhost me false
//             sameSite: "lax",
//             maxAge: 6 * 24 * 60 * 60 * 1000
//         });



//         res.status(200).json({
//             status: "sucess",
//             message: "login successfully",
//             data: {
//                 name: user.userName,
//                 email: user.email,
//                 access_token

//             }
//         })


//     } catch (err) {
//         console.error("Login Error", err);
//         return res.status(500).json({
//             status: "failed",
//             message: "Internal server error"
//         });

//     }
// }   

    export const login = async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body)
        try {
            const user = await User.findOne({ email });
            console.log("USER FOUND:", user);
            if (!user) {
                return res.status(400).json({
                    message: "invalid credentials"
                });
            }
            const isValidPassword = await comaprePassword(
                password,
                user.password
            );
            if (!isValidPassword) {
                return res.status(400).json({
                    message: "invalid password"
                });
            }
            const access_token = generateToken({
                userId: user._id,
                name: user.userName
            });
            res.cookie("jwt", access_token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 6 * 24 * 60 * 60 * 1000
            });

            // console.log(access_token)
            res.status(200).json({
                status: "success",
                message: "login successfully",
                data: {
                    nameName: user.userName,
                    email: user.email,
                    _id: user._id,
                    access_token
                }
            });

        } catch (err) {
            console.error("Login Error", err);

            return res.status(500).json({
                status: "failed",
                message: "Internal server error"
            });
        }
    };

export const logout = (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(200).json({
            status: "success",
            message: "Logout successful"
        });

    } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
};


export const updateProfile = (req, res) => {
    try {

    } catch (err) {

    }
}