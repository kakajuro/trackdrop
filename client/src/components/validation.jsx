import React from 'react';

export default function Validation({ text }){
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "40px"}}>
      <p style={{color:"rgb(255, 0, 0)", textAlign:"center", fontSize: "14pt", fontWeight: "bold", paddingTop: "1rem"}}>{text}</p>
    </div>
  )
}