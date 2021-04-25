import React from "react";

import "../styles/postButton.scss";

export default function postButton() {
  const postModal = () => {
    console.log("postModal");
  };

  return (
    <button className='logout-button' onClick={() => postModal()}>
      Post
    </button>
  );
}
