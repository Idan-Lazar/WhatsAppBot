import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import QRCode from "qrcode.react";
import 'antd/dist/antd.css';
import MainView from "./components/MainView"
function App() {
  const [qr, setQr] = useState();
  const [ready, setReady] = useState(false);
  const [socketState, setSocket] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket)
    socket.on("getQr", (data) => {
      console.log(data);
      setQr(data);
    });
    socket.on("ClientReady", (data) => {
      if (data) {
        setReady(true);
      }
      console.log(data);
    });
  }, []);

  const sendMessages=(value)=>{
    socketState.emit("submitMessages",value)
  }
  return (
    <div className="App">
      {!ready ? (
        qr ? (
          <QRCode value={qr} className="qr"/>
        ) : (
          <div className="loader"/>
        )
      ) : (
        <MainView sendMessages={(value)=>sendMessages(value)}/>
      )}
    </div>
  );
}

export default App;
