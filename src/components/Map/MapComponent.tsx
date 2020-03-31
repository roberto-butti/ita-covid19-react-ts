import React, { useEffect, useState, useRef } from 'react';
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
  let layerGeojson: any = {};
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

  const pleaseColor = (attributeName: string, gradientLevel: number ) => {
    let gradient = ["rgba(102, 255, 0, 0)",
      "rgba(102, 255, 0, 1)",
      "rgba(147, 255, 0, 1)",
      "rgba(193, 255, 0, 1)",
      "rgba(238, 255, 0, 1)",
      "rgba(244, 227, 0, 1)",
      "rgba(249, 198, 0, 1)",
      "rgba(255, 170, 0, 1)",
      "rgba(255, 113, 0, 1)",
      "rgba(255, 57, 0, 1)",
      "rgba(255, 0, 0, 1)"];

    return [
      /*
      {
        "fill": "#fa3f01",
        "type": "Polygon",
        "width": 26,
        "height": 26,
        "radius": 13,
        "zIndex": 913,
        "opacity": 1
      },*/
      {
        //"fill": "rgba(0,0,0,0)",
        "type": "Polygon",
        "opacity": 0.5,
        "stroke": "#BE6B65",
        "fill": gradient[gradientLevel],
        //"fill": "#fa3f01",
        "zIndex": 912,
        "strokeWidth": 1
      },
      {
        "fill": "rgba(0,0,0,1)",
        "font": "normal 12px Arial",
        "type": "Text",
        "stroke": "rgba(255,255,255,1)",
        "zIndex": 919,
        "offsetX": 0,
        "offsetY": 0,
        "opacity": 1,
        "textRef": "properties['" + attributeName + "'] || ''",
        "strokeWidth": 1
      }
    ]
  }
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
          10: pleaseColor("variazione_totale_positivi",10),
          9: pleaseColor("variazione_totale_positivi", 9),
          8: pleaseColor("variazione_totale_positivi", 8),
          7: pleaseColor("variazione_totale_positivi", 7),
          6: pleaseColor("variazione_totale_positivi", 6),
          5: pleaseColor("variazione_totale_positivi", 5),
          4: pleaseColor("variazione_totale_positivi", 4),
          3: pleaseColor("variazione_totale_positivi", 3),
          2: pleaseColor("variazione_totale_positivi", 2),
          1: pleaseColor("variazione_totale_positivi", 1),
          0: pleaseColor("variazione_totale_positivi", 0),

          default: [

            { zIndex: 2, type: "Line", stroke: "#0000FF", strokeWidth: 1 },
            { zIndex: 3, type: "Text", textRef: "properties.variazione_totale_positivi", fill: "#3D272B" }
          ]
        },

        assign: function (feature: any, zoomlevel: number) {
          /**
           * For styling
           * https://xyz.api.here.com/maps/latest/documentation/here.xyz.maps.layers.TileLayer.Style.html
           */
          //console.log(feature, zoomlevel);
          if (feature.properties.variazione_totale_positivi > 1000) {
            return "10"
          } else if (feature.properties.variazione_totale_positivi < 100) {
            return "0";
          } else if (feature.properties.variazione_totale_positivi >= 100 && feature.properties.variazione_totale_positivi <= 1000) {
            let n = Math.ceil(feature.properties.variazione_totale_positivi / 100) * 1;
            //console.log(n);
            return n.toString();
          }
          return  "default";

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
          let regionName = element.properties.NOME_REG;
          //regionName = (regionName === "Emilia-Romagna") ? "Emilia Romagna" : regionName;
          let regions = (regionName === "Trentino-Alto Adige") ? ["P.A. Bolzano", "P.A. Trento"] : [regionName];
          const region = data.filter(d => regions.includes(d.denominazione_regione) );
          console.log("load geojson, data   : ", region);
          if (region.length >0 ) {
            let d = new Date(region[0].data);
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            setDataAggiornamento(d.toLocaleDateString('it-IT', options));
            let nuoviAttualmentePositivi = 0;
            for (let idxregions = 0; idxregions < region.length; idxregions++) {
              nuoviAttualmentePositivi = nuoviAttualmentePositivi + region[idxregions].variazione_totale_positivi;

            }
            res.features[index].properties.variazione_totale_positivi = nuoviAttualmentePositivi;
          }
          console.log(res.features[index].properties);
          layerGeojson.addFeature(element);

        }
      })
      .catch(err => setErrors(err));
  }




  const onInit = () => {
    console.log("OPS", Date.now());

    if (hereMap === false) {
      layerGeojson = createLayerGeojson();
      fetchData();
      loadRegionGeojson();
      hereMap = new here.xyz.maps.Map(mapContainer.current, {
        zoomLevel: geoInfoDefault.zoom,
        center: [geoInfoDefault.lng, geoInfoDefault.lat,],
        layers: [createLayerMVT(), layerGeojson]
      });

    }

  };

  useEffect(onInit, []); // mount



  return (
    <div>
      <div className=" w-full p-3" >
        <div className="">
          Variazione totale positivi (totale_attualmente positivi giorno corrente - totale_attualmente positivi giorno precedente) per regione.
        Dati aggiornati a {data_aggiornamento}
        {hasError &&
          <>
            <hr />
          Qualche errore durante il recupero dati.
          </>
        }
        </div>
        <div className="min-h-screen w-full p-3" ref={mapContainer}></div>
      </div>
    </div>
  );
}


export default MapComponent;
