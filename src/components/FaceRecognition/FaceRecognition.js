import React from "react";
import "./Facerecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma flex justify-center">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt={""}
          width="500px"
          height="auto"
        />
        <div
          className="bounding_box"
          style={{
            left: box.leftCol,
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
