const axios=require("axios");

setInterval(async()=>{
        const devices = ["device1", "device2", "device3", "device4"];
        const randomDevice = devices[Math.floor(Math.random() * devices.length)];
        const data={
        Deviceid: randomDevice,
        temperature : (Math.random()*40).toFixed(2),
        humidity : (Math.random()*100).toFixed(2)
    }
    await axios.post("http://localhost:5000/api/data",data)
    .then(()=>{
        console.log("Data sent:",data);
    })
    .catch(err=>{
        console.log(err);

    })
},3000)