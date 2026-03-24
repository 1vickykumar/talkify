import { resendClintEmail, sender } from "../utils/resend.js"
import { welcomeEmailTemplate } from "./emialTemplate.js"

export const sendWelcomeEmail = async (email,name,clientURL)=>{
   
    const {data,error}= await resendClintEmail.emails.send({
        from:`${sender.name}<${sender.email}>`,
        to:email,
         subject: "Welcome to Our TALKIFY--App 🎉",
        html:welcomeEmailTemplate(name,clientURL)

    })

    if(error){
        console.error("error sending welcome email",error)
        throw new Error("Failed to send welcome email")
    }

    console.log("WelCome Email sent successfully",data)

}