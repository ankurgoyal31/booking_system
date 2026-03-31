import express from "express";
import connect from "./connection.js";
const db = await connect(); 
import { check_event,check_user,check_user_ticket,events_status,check_user_booking,check_email_exists} from "./varification.js";
const app = express(); 
 app.use(express.json()) 
 app.post("/user",check_email_exists,async(req,res)=>{
    try{
const [user] = await db.query("insert into users (name,email) values (?, ?)",[req.body.name, req.body.email]);
res.status(200).json({message:"user sucessfully created, please use this user_Id to booking or create the events",user_id:user.insertId})
    }catch(err){
        res.status(400).json({message:"something went wrong.."}) 
    }    
})  

app.post("/events",check_user, async(req,res)=>{
    try{
let [events] = await db.query(`insert into events (status,title, description,date, total_capacity,remaining_tickets, user_id)  values (?,?, ?, ?, ?, ?, ?)`
    ,[true,req.body.title,req.body.description,req.body.date,req.body.total_capacity,req.body.total_capacity, req.body.user_id]);
res.status(200).json({message:'your event created sucessfully,please use this event_id for booking',event_id:events.insertId})
    }catch(err){
        res.status(400).json({message:"something went wrong.."}) 
    }
})

app.post("/booking_ticket",check_user,check_event,events_status,check_user_ticket,async(req,res)=>{
    try{
let [update] = await db.query("UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ? AND remaining_tickets > 0",[req.body.event_id]);
if(update.affectedRows==0){
await db.rollback(); 
return res.status(400).json({ message: "Tickets sold out" });
}
let [booking] = await db.query("insert into bookings (user_id,event_id) values (?,?)",[req.body.user_id,req.body.event_id])
res.status(200).json({message:"your booking confirmed....",booking_id:booking.insertId})
    }catch(err){ 
        res.status(400).json({message:"something went wrong.."}) 
    } 
})

app.post("/cancel_booking",async(req,res)=>{
    try{
let [cancel] = await db.query("delete from bookings where user_id=? and event_id=?",[req.body.user_id,req.body.event_id]);
res.status(200).json({message:'sucessfully deleted'})
    }catch(err){
        res.status(400).json({message:"something went wrong.."}) 
    }
})

app.post("/cancel_events",async(req,res)=>{
    try{
let [delete_event] = await db.query("update events set status=false where id=? and user_id=?",[req.body.event_id,req.body.user_id]);
res.status(200).json({message:"cancled sucessfully...."})
    }catch(err){
        res.status(400).json({message:"something went wrong.."}) 
    }
})

app.post("/events/:id/attendance",check_user,check_event,check_user_booking,async(req,res)=>{
        try{
         const event_id = req.params.id;
          let [already] = await db.query("SELECT * FROM event_attendance WHERE user_id=? AND event_id=?",[req.body.user_id, event_id]);
         if (already.length > 0) {
         return res.send({ message: "Attendance already marked" });
    }
        let data = await db.query("insert into event_attendance (user_id,event_id) values (?,?)",[req.body.user_id,event_id])
         res.status(200).json({message:'sucessfully join'})
    }catch(err){
        res.status(400).json({message:"something went wrong.."}) 
    }
})
app.listen(5000,(req,res)=>{ 
    console.log("running........");
})
