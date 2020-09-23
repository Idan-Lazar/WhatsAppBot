import React, { useState } from "react";
import { Button } from "antd";
import "./styles.css";
import { ReactComponent as Contact } from "../../resources/contact.svg";
import AddModal from "../AddModal";

function MainView(props) {
  const { sendMessages } = props;  
  const [visModal, setVisModal] = useState(false);
  const [futureMessages, setFutureMessages] = useState({});

  const handleSubmit= ()=>{
    sendMessages(futureMessages)
    setFutureMessages({})
  }
  return (
    <div className="container">
      <div className="button">
        <Button className="headline" onClick={() => setVisModal(true)}>
          <Contact height={20} width={20} />
        </Button>
      </div>
      {Object.keys(futureMessages).length > 0 && (
        <>
          <div>{Object.keys(futureMessages).join(",")}</div>
          <div className="button">
            <Button className="headline" onClick={() => handleSubmit()}>
              Send Messages
            </Button>
          </div>
        </>
      )}
      {visModal && (
        <AddModal
          setVisModal={setVisModal}
          futureMessages={futureMessages}
          setFutureMessages={setFutureMessages}
        />
      )}
    </div>
  );
}
export default MainView;
