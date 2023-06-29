import React from "react";
import tokenIMG from "../../../assets/svg/tokens/starbuck.svg";

interface IPairToken {
  from_img: any;
  to_img: any;
}
const PairToken = () =>
  // props: IPairToken
  {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={tokenIMG} style={{ width: 36, marginLeft: 16 }} alt="token" />
        <img
          src={tokenIMG}
          style={{ width: 36, right: 16, position: "relative" }}
          alt="token"
        />
      </div>
    );
  };

export default PairToken;