import React from 'react';

export default function Post(props) {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <h1>{props.title}</h1>
      <h2>{props.artist}</h2>
      <p>{props.link}</p>
      <p>{props.author}</p>
    </div>
  )
}
