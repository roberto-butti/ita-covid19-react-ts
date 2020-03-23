import React from 'react';
import MapComponent from "../../components/Map/MapComponent";
export interface IMapProps {
}



export default function Map (props: IMapProps) {


  return (
    <div>
      <MapComponent data={ [] }></MapComponent>
    </div>
  );
}
