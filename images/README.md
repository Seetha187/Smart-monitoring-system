# Smart Monitoring System

##  About the Project
This project is a real-time monitoring system where multiple devices send data like temperature and humidity.

The data is stored in a database and shown on a dashboard with live updates. It also shows alerts when the temperature becomes high.

---

##  Features

- Real-time data update  
- Multiple devices sending data  
- Live chart for temperature  
- Alert when temperature is high  
- Filter data by device  
- Simple and clean user interface  

---

##  Technologies Used

**Frontend:**
- React  
- Axios  
- Recharts  

**Backend:**
- Node.js  
- Express  

**Database:**
- MongoDB Atlas  

**Real-time:**
- Socket.IO  

---

##  How it Works

1. A simulator generates random data for different devices  
2. Backend receives and stores the data  
3. Frontend fetches and displays the data  
4. Socket.IO sends live updates to the UI  

---

##  How to Run the Project

### Start Backend
Go to backend folder and run:

```bash
cd backend
node server.js

### Start Simulator
Run this to generate data:

```bash
node simulator.js

### Start Frontend

Go to frontend folder and run:

```bash
cd frontend
npm start

## Screenshots

### Dashboard
[Dashboard](images/sms.png)

### Chart View And Alerts
[Chart](images/sms1.png)
