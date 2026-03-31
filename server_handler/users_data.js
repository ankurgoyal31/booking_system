import express from "express";
import connect from "./connection.js";
import { check_event,check_user,check_user_ticket,events_status,check_user_booking,check_email_exists} from "./varification.js";
import fs from "fs"
import { run_sql } from "./run_sql.js";
const  sql = fs
const app = express();
await run_sql();
app.use(express.json())
const db = await connect(); 
 
app.post("/user",check_email_exists,async(req,res)=>{
    try{
const [user] = await db.query("insert into users (name,email) values (?, ?)",[req.body.name, req.body.email]);
console.log(user.id)
res.send({message:"user sucessfully created, please use this user_Id to booking or create the events",user_id:user.insertId})
    }catch(err){
        res.send({message:'something went wrong',err:err});
    }    
}) 

app.post("/events",check_user, async(req,res)=>{
    try{
let [events] = await db.query(`insert into events (status,title, description,date, total_capacity, remaining_tickets, user_id)  values (?,?, ?, ?, ?, ?, ?)`
    ,[true,req.body.title,req.body.description,req.body.date,req.body.total_capacity,req.body.remaining_tickets, req.body.user_id]);
res.send({message:'your event created sucessfully,please use this event_id for booking',event_id:events.insertId})
    }catch(err){
        res.send({message:'something went wrong....',create:false,err:err})
    }
})

app.post("/booking_ticket",check_user,check_event,events_status,check_user_ticket,async(req,res)=>{
    try{
let [update] = await db.query("UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ? AND remaining_tickets > 0",[req.body.event_id]);
if(update.affectedRows==0){
await db.rollback(); 
return res.send({ message: "Tickets sold out" });
}

let [booking] = await db.query("insert into bookings (user_id,event_id) values (?,?)",[req.body.user_id,req.body.event_id])
res.send({message:"your booking confirmed....",booking_id:booking.insertId})
    }catch(err){ 
        res.send({message:'something went wrong....',booking:'failed',err:err});
    } 
})

app.post("/cancel_booking",async(req,res)=>{
    try{
let [cancel] = await db.query("delete from bookings where user_id=? and event_id=?",[req.body.user_id,req.body.event_id]);
res.send({message:'sucessfully deleted'})
    }catch(err){
        res.send({message:'something went wrong....'})
    }
})

app.post("/cancel_events",async(req,res)=>{
    try{
let [delete_event] = await db.query("update events set status=false where id=? and user_id=?",[req.body.event_id,req.body.user_id]);
res.send({message:"cancled sucessfully...."})
    }catch(err){
        res.send({message:"something went wrong.."}) 
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
         res.send({message:'sucessfully join'})
    }catch(err){
        console.log(err)
               res.send({message:"something went wrong..",err:err})  
    }
})

let book = await db.query("select * from events")
console.log(book)

app.listen(5000,(req,res)=>{ 
    console.log("running........");
})