import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    recivedId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true

    },
    
    text:{
        type:String,
        trim:true,
        maxlength:2000  

    },

    image:{
        type:String
    }   

},
{timestamps:true}
)

const Message = mongoose.model("message",messageSchema);
export default Message;