import React, {  useEffect, useState, useRef } from 'react';
import "./MapComponent.css";
import Theme from './miamiDay.js';

export interface IMapComponentProps {
  data: string[] | number[];
}
declare global {
  interface Window {
    HERE: any;
  }
}





const MapComponent: React.FunctionComponent<IMapComponentProps> = (props) => {
  //const [geoInfo, setGeoInfo] = useState({ lat: 41.890251, lng: 12.492373, zoom:12})
  const [hasError, setErrors] = useState(false)
  const [data_aggiornamento, setDataAggiornamento] = useState<string>("")

  const mapContainer = useRef(null);
  const geoInfoDefault = { lat: 41.890251, lng: 12.492373, zoom: 6 };
  let here = (window as any).HERE;
  let hereMap = false;
  //let layerMVT = {};
  let layerGeojson:any = {};
  let XYZ_ACCESS_TOKEN = process.env.REACT_APP_HERE_APIKEY;
  let data: any[] = [];


  const createLayerMVT = () => {
    let layerMVT = new here.xyz.maps.layers.MVTLayer({
      name: 'mvt-world-layer',
      remote: { url: 'https://xyz.api.here.com/tiles/herebase.02/{z}/{x}/{y}/omv?access_token=' + XYZ_ACCESS_TOKEN },
      style: Theme
    });
    return layerMVT;
    //layerMVT.pointerEvents(false);
  };

  const createLayerGeojson = () => {
    let layerGeojson = new here.xyz.maps.layers.TileLayer({
      name: 'mySpaceLayer',
      min: 1,
      max: 10,
      provider: new here.xyz.maps.providers.LocalProvider({
        name: 'my Region Provider'
      }),
      style: {
        styleGroups: {
          default: [

            { zIndex: 2, type: "Line", stroke: "#0000FF", strokeWidth: 1 },
            { zIndex: 3, type: "Text", textRef: "properties.nuovi_attualmente_positivi", fill: "#3D272B" }
          ]
        },
        assign: function (feature: any, zoomlevel: number) {
          //console.log(feature, zoomlevel);
          return "default";
        }
      }

    })
    return layerGeojson;
    //layerMVT.pointerEvents(false);
  };

  async function fetchData() {
    let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json";

    const res = await fetch(url,
      {
        cache: "default"
      }
    );
    res
      .json()
      .then((res) => {
        //console.log("FETCH DATA : ", res)
        data = res;
      })
      .catch(err => setErrors(err));
  }

  async function loadRegionGeojson() {
    let url = "https://gist.githubusercontent.com/datajournalism-it/48e29e7c87dca7eb1d29/raw/2636aeef92ba0770a073424853f37690064eb0ea/regioni.geojson";


    const res = await fetch(url,
      {
        cache: "default"
      }
    );
    res
      .json()
      .then((res) => {
        //console.log(res)
        for (let index = 0; index < res.features.length; index++) {
          const element = res.features[index];
          console.log("load geojson, regione: ", element.properties);
          const region = data.filter(d => d.denominazione_regione === element.properties.NOME_REG);
          console.log("load geojson, data   : ", region);
          if (region.length === 1) {
            let d = new Date(region[0].data);
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            setDataAggiornamento(d.toLocaleDateString('it-IT',options));
            res.features[index].properties.nuovi_attualmente_positivi = region[0].nuovi_attualmente_positivi;
          }
          console.log(res.features[index].properties);
          layerGeojson.addFeature(element);

        }
      })
      .catch(err => setErrors(err));
  }




  const onInit = () => {
    console.log("OPS", Date.now());

    if ( hereMap === false) {
      layerGeojson = createLayerGeojson();
      fetchData();
      loadRegionGeojson();
      hereMap = new here.xyz.maps.Map(mapContainer.current, {
        zoomLevel: geoInfoDefault.zoom,
        center: [geoInfoDefault.lng, geoInfoDefault.lat,  ],
        layers: [createLayerMVT(), layerGeojson]
      });

    }

  };

  useEffect(onInit, []); // mount



  return (
    <div>
      <div className="mapWrapper">
        Nuovi Attualmente positivi per regione.
        Dati aggiornati a { data_aggiornamento }
        { hasError &&
          <>
          <hr />
          Qualche errore durante il recupero dati.
          </>
        }

        <div className="map" ref={mapContainer}></div>
      </div>
    </div>
  );
}


export default MapComponent;
