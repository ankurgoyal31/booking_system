import connect  from "./connection.js";
let db = await connect();

const check_email_exists = async(req,res,next)=>{
    try{
let [email] = await db.query("select * from users where email=? and name=?",[req.body.email,req.body.name])
if(email.length>0){
    return res.send({message: "Email or Name already exists"})
}

next()
    }catch(err){
        return res.send({message:"please check your connection....",err:err})
    }
}

 const check_user = async(req, res, next)=>{
    try{
console.log("called....",req.body.user_id)
let [user] = await db.query("select * from users where id=?",[req.body.user_id])
if(user.length===0){
    return res.send({message:"please login...."});
}
next();
    }catch(err){
        console.log(err)
return res.send({message:"please check your connection....",err:err})
    } 
} 
 
const events_status = async(req,res,next)=>{
    try{
  let [event]  = await db.query("select * from events where id=?",[req.body.event_id])
if(event[0].status===0){
return res.send({message:'currently event is cancel by admin....'});
}
next();
    }catch(err){
 return res.send({message:"please check your connection...."}) 
    }
}

const check_user_ticket = async(req, res, next)=>{
    try{
 let [ticket] = await db.query("select * from bookings where user_id=? and event_id=?",[req.body.user_id,req.body.event_id])
if(ticket.length>0){
    return res.send({message:"you are already booked 😊 ..."});
}
next();
    }catch(err){
return res.send({message:"please check your connection...."})
    }
}

const check_event = async(req,res,next)=>{
    try{
         const event_id = req.params.id || req.body.event_id;
         console.log("called....")
let [event]  = await db.query("select * from events where id=?",[event_id])
if(event.length===0){
    return res.send({message:"no event found...."}) 
}
next();
    }catch(err){
 return res.send({message:"please check your connection...."}) 
    }
}

const check_user_booking = async (req,res,next)=>{
      try{
 const event_id = req.params.id || req.body.event_id;
 let [ticket] = await db.query("select * from bookings where user_id=? and event_id=?",[req.body.user_id,event_id])
if(ticket.length===0){
    return res.send({message: "No booking found for this user for the event"});
}
next();
    }catch(err){
return res.send({message:"please check your connection....",err:err})
    }
}

export {check_user,check_event,check_user_ticket,events_status,check_user_booking,check_email_exists};

// {
//    "title":"aja meri rani safari",
//    "description":"ajao",
//    "date":"2006-4-4",
//    "total_capacity": 2,
//    "remaining_tickets":2,
//    "user_id":16
// }