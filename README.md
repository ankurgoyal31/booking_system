# Event Booking API

## 🌐 Live API

Base URL:

```
https://booking-system-cu2j.onrender.com
```

---

## 📌 Overview

This is a backend API for an Event Booking System built using **Node.js, Express, and MySQL**.
It supports user registration, event creation, ticket booking, cancellation, and attendance tracking.

---

## 🚀 Features

* User Registration (with email validation)
* Create Events
* Book Tickets (with capacity control)
* Cancel Booking
* Cancel Event (by owner)
* Attendance System
* Duplicate prevention (email, booking, attendance)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* mysql2

---

## 📂 Project Structure
```
server_handler/
   connection.js
   init.sql
   run_sql.js
   users_data.js
   varification.js

.env
package.json
```

---

## ⚙️ Setup

Install dependencies:

```
npm install
```

Run server:

```
node server_handler/users_data.js
```

---

# 📡 API Endpoints

---

## 🔹 Create User

**POST** `/user`

### Request

```json
{
  "name": "Ankur",
  "email": "ankur@gmail.com"
}
```

### Validation

* Email format is validated using regex

### Response

```json
{
  "message": "user successfully created",
  "user_id": 1
}
```

---

## 🔹 Create Event

**POST** `/events`

### Request

```json
{
  "title": "Event Name",
  "description": "Event Description",
  "date": "2026-04-01",
  "total_capacity": 100,
  "user_id": 1
}
```

### Logic

* `remaining_tickets` is initialized equal to `total_capacity`

### Response

```json
{
  "message": "your event created successfully",
  "event_id": 1
}
```

---

## 🔹 Book Ticket

**POST** `/booking_ticket`

### Request

```json
{
  "user_id": 1,
  "event_id": 1
}
```

### Logic

* Checks user exists
* Checks event exists
* Checks event is active
* Prevents duplicate booking
* Decreases `remaining_tickets` safely

### Response

```json
{
  "message": "your booking confirmed",
  "booking_id": 1
}
```

---

## 🔹 Cancel Booking

**POST** `/cancel_booking`

### Request

```json
{
  "user_id": 1,
  "event_id": 1
}
```

### Response

```json
{
  "message": "successfully deleted"
}
```

---

## 🔹 Cancel Event

**POST** `/cancel_events`

### Request

```json
{
  "user_id": 1,
  "event_id": 1
}
```

### Response

```json
{
  "message": "cancelled successfully"
}
```

---

## 🔹 Mark Attendance

**POST** `/events/:id/attendance`

### Request

```json
{
  "user_id": 1
}
```

### Logic

* User must have booking
* Attendance can be marked only once

### Response

```json
{
  "message": "successfully joined"
}
```

---

## 🔹 Get User Bookings

**GET** `/users/:id/bookings`

### Example

```
GET https://booking-system-cu2j.onrender.com/users/1/bookings
```

### Response

```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "event_id": 1
    }
  ]
}
```

---

# ⚠️ Error Handling

### Invalid Email

```json
{
  "message": "Invalid email format"
}
```

---

### Duplicate Email

```json
{
  "message": "Email already exists"
}
```

---

### Tickets Sold Out

```json
{
  "message": "Tickets sold out"
}
```

---

### Duplicate Booking

```json
{
  "message": "you are already booked"
}
```

---

### Attendance Already Marked

```json
{
  "message": "Attendance already marked"
}
```

---

### Server Error

```json
{
  "message": "something went wrong"
}
```

---

# ⚡ Important Concepts

* Email is stored as UNIQUE in the database
* Remaining tickets are updated atomically
* Duplicate booking prevented using middleware + DB

---

## 👨‍💻 Author

Ankur Goyal
