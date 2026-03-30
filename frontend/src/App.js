import react,{useState,useEffect} from "react";
import axios from "axios";
import { io } from "socket.io-client";
import{LineChart,XAxis,YAxis,Line,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";




function App() {
  
  const socket = io("http://localhost:5000");

  const[ data ,setData]= useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000/api/data")
    .then(res => {
      setData(res.data);
    })
    .catch(err =>{
      console.log(err);
    })
    socket.on("newData", (newItem) => {
    setData(prev => [newItem, ...prev]);
  })
  return () => {
    socket.off("newData");
  };

  },[]);
  console.log(data);
  const hasHighTemp = data.some(item => item.temperature >35);
  const[selectedData,setselectedData]=useState("All");
  const[filterType,setFilterType]=useState("All");

  const filteredData= data.filter(item =>{
    const deviceMatch= selectedData=== "All" || item.Deviceid === selectedData;
    const tempMatch = filterType=== "All" ||     (filterType === "High" && item.temperature > 35) ||
    (filterType === "Normal" && item.temperature <= 35);
      return deviceMatch && tempMatch;

  }) 

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Smart Monitoring DashBoard </h1>
      <div style={styles.controls}>
        <div style={styles.selectBox}>
           <label style={styles.label}>Device</label>
        <select  value={selectedData} onChange={(e)=>setselectedData(e.target.value)} style={styles.select}>
          <option value="All">All Devices</option>
          <option value="device1">device1</option>
          <option value="device2">device2</option>
          <option value="device3">device3</option>
          <option value="device4">device4</option>
         
        </select>
        </div>
        <div style={styles.selectBox}>
          <label style={styles.label}>Filter</label>
        <select value={filterType}onChange={(e)=>setFilterType(e.target.value)} style={styles.select}>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          
        </select>
        </div>

      </div>


      {hasHighTemp && (
        <div style={styles.alert}>
          High Temperature Detected!
          </div>
      )}

      <div style={{width:"100%", height:300}}>
        <ResponsiveContainer>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="timestamp"
            tickFormatter={(time)=> new Date(time).toLocaleTimeString()}/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="temperature" stroke="#0d6efd" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.grid}>
        {filteredData.map((item, index) => {
          const isHigh = item.temperature > 35;
          return(
          
          <div key={index} style={{ ...styles.card,  borderLeft : isHigh ? "5px solid red" : "5px solid #0d6efd"}}>
            <h3 style={styles.device}>Device : {item.Deviceid}</h3>

            <p style={styles.temp}>
              🌡 Temperature: {item.temperature}°C
            </p>

            <p style={styles.humidity}>
              💧 Humidity: {item.humidity}%
            </p>
            {
              isHigh && (<p style={{color:"red", fontWeight: "bold"}}>
                High Temperature Alert!
              </p>
            )}
            
          </div>
         );
      })}
      </div>
      </div>
  
  );
    
  }

const styles = {
  container: {
      background: "linear-gradient(to right, #e3f2fd, #ffffff)",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Segoe UI"

  },
  title: {
    textAlign: "center",
    color: "#0d6efd",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px"
  },
  alert:{
    background: "linear-gradient(to right, #ff4d4d, #ff0000)",
    color: "white",
    padding: "12px",
    textAlign: "center",
    marginBottom: "20px",
    borderRadius: "8px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },

  device: {
    color: "#0d6efd"
  },
  temp: {
    fontSize: "16px",
    margin: "10px 0"
  },
  humidity: {
    fontSize: "16px"
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "25px"

},
selectBox: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
},

label: {
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#333"
},

select: {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#ffffff",
  fontSize: "14px",
  cursor: "pointer",
  outline: "none",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  transition: "0.2s"
}
};


export default App;
