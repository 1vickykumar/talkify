import express from 'express';
import { allChats, allContacts, getMessage, sendMessage, } from '../controller/message.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const  messageRouter = express.Router();
messageRouter.use(authMiddleware)

messageRouter.get("/contact",allContacts)
messageRouter.get("/chats",allChats)
messageRouter.get("/:id",getMessage)
messageRouter.post("/send/:id",sendMessage)


// messageRouter.get("/test", (req, res) => {
//     res.send("Hello from meessage route");
// });

export default messageRouter;