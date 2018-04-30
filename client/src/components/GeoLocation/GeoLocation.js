import React from "react";

const GeoLocation = props => {
  return (
    <div>
      <button  onClick={() => props.userLocation()}>Use Current Location?</button>
    </div>
  );
};

export default GeoLocation;
