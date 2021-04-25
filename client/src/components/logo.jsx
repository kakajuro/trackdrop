import React from "react";
import SiteLogo from "../imgs/logo.svg";

export default function Logo(props) {
  return (
    <div>
      <img
        src={SiteLogo}
        alt='Site Logo'
        style={{ width: props.width, height: props.height }}
      />
    </div>
  );
}
