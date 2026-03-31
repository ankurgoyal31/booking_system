create database if not exists events;
use events;

CREATE TABLE if not exists users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id int not null,
    status boolean,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  total_capacity INT NOT NULL,
  remaining_tickets int not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  foreign key(user_id) references users(id)
  );

CREATE TABLE if not exists bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON update CASCADE
 );
CREATE TABLE if not exists event_attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  entry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
