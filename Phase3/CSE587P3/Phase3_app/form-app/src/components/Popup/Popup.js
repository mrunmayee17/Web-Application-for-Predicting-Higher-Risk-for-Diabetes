import React from "react";
import "./Popup.css";
export const Popup = ({ text, closePopup }) => {  
    return (    
        <div className="popup-container">     
            <div className="popup-body">      
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>{text}</h1>
                <br></br>   
                <button className="closebutton" onClick={closePopup}><b>X</b></button>     
            </div>
        </div>
    );};