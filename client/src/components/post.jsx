import React, { useEffect, useState } from "react";

import Spacer from "react-spacer";

import uniqid from "uniqid";

export default function Post(props) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  return (
    <div className="container">
      <div className='post'>
        <h2 style={{ color: "black" }}>
          Reccomendation: {props.artist} - {props.title}
        </h2>
        <p>
          <a href={props.link}>Track link</a>
        </p>
        <div>
          {tags.map((tag) => (
            <li key={uniqid()}>{tag}</li>
          ))}
        </div>
      </div>
      <Spacer height='20px' />
    </div>
  );
}
