import Message from "../model/message.model.js";
import User from "../model/user.model.js"
import cloudinary from "../utils/cloudinary.js";

export async function allContacts(req, res) {

    try {
        const loggedInUser = req.user._id


        const filterUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json(filterUser)

    } catch (err) {
        console.error('Auth middleware error', err);
        return res.status(500).json({ status: 'failed', message: 'Internal server error' });
    }

}

export async function getMessage(req, res) {
    try {

        const myId = req.user._id;

        const { id: userToChat } = req.params;
        // console.log(userToChat,"    hgixq")

        const message = await Message.find({
            $or: [
                { senderId: myId, recivedId: userToChat },
                { senderId: userToChat, recivedId: myId }
            ]
        });

        res.status(200).json(message);

    } catch (err) {
        console.error("Get message error:", err);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
}

export async function sendMessage(req, res) {
    try {

        const { text, image } = req.body;
        const { id: recivedId } = req.params;
        const senderId = req.user._id;

        let imageUrl = null;

        // Upload image to cloudinary
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "chat-app",
                public_id: `IMG_${Date.now()}`,
            });

            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recivedId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Send message error:", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function allChats(req, res, next) {
    try {

        const loggedInUserId = req.user._id

        const message = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { recivedId: loggedInUserId }
            ]
        });

        const chatPartnerIds = [...new Set(message.map((chats) =>
            chats.senderId.toString() === loggedInUserId.toString()
                ? chats.recivedId.toString()
                : chats.senderId.toString())
        )
        ]

        const chatPartner = await User.find({ _id: { $in: chatPartnerIds } }).select("-password")
        res.status(201).json(chatPartner)

    } catch (error) {
        console.error(error)
    }

}