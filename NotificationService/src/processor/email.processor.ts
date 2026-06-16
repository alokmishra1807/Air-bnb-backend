import {  Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queue/mailer.queue";
import { getRedisConnObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../template/template.handler";
import logger from "../config/logger.config";
import { sendEmail } from "../services/mail.service";



export const setUpMailerFunction = ()=>{
const emailProccessor = new Worker<NotificationDto>(
    MAILER_QUEUE,
    async (job : Job)=>{


        if(job.name !== MAILER_PAYLOAD){
            throw new Error("Invalid Job name");

        }

          const payload = job.data;
            console.log(`Processing email for: ${JSON.stringify(payload)}`);
              const emailContent = await renderMailTemplate(payload.templateId, payload.params);

              console.log(emailContent);

            await sendEmail(payload.to, payload.subject, emailContent);

            logger.info(`Email sent to ${payload.to} with subject "${payload.subject}"`);

    },
    {
        connection: getRedisConnObject()
    }

)

emailProccessor.on("failed",()=>{
    console.log("Email processing failed")
})

emailProccessor.on("completed",()=>{
    console.log("Email processing completed successfully")
})


}

