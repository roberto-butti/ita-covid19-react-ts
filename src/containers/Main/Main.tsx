import React, { useState, useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import Metrics from "../../components/Metrics/Metrics";
import SelectRegions from "../../components/Select/Regions";
import { useTranslation } from 'react-i18next';

interface IMainProps {
}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  const [hasError, setErrors] = useState(false)
  const [data, setData] = useState<[]>([])
  const [region, setRegion] = useState("all")
  const { t } = useTranslation();

  async function fetchData(region: string) {
    let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";
    if (region !== "all") {
      url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";
    }

    const res = await fetch(url,
      {
        cache: "default"
      }
    );
    res
      .json()
      .then((res) => {
        console.log(res)
        if (region !== "all") {
          res = res.filter((d: any) => d.denominazione_regione === region)
        }
        let prevRow = {};
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          res[index]["prev"] = prevRow;
          prevRow = element;
        }
        setData(res)
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData(region);
  }, [region]);

  function selectRegion(event: any) {
    setRegion(event.target.value)
    //fetchData(region);
  };


  return <>
    <SelectRegions region={region} selectRegion={selectRegion}></SelectRegions>
    <hr className="border-b-2 border-gray-400 my-8 mx-4" />
    <Metrics
      data={data} region={region}
    />
    <hr className="border-b-2 border-gray-400 my-8 mx-4" />


    <div className="bg-white border-t border-gray-400 shadow">
      <div className="container  mx-auto py-8">
        <div className="w-full ">
          <div className="border-b p-3">
            <h5 className="font-bold uppercase text-gray-600">{t("puoi_analizzare_il_dettaglio_dei_dati")}:</h5>
          </div>

        </div>

        <div className="w-full pt-5 mx-auto flex flex-wrap">

            <div className="flex w-full md:w-1/3 ">
            <div className="px-8 text-3xl">
              <Link to="/tabelle" className=""><i className={`fas fa-table fa-fw mr-3 text-blue-600`}></i> {t("Tabelle")}</Link>
            </div>
          </div>
          <div className="flex w-full md:w-1/3 ">
            <div className="px-8 text-3xl">
              <Link to="/grafici" className=""><i className={`fas fa-chart-line fa-fw mr-3 text-red-600`}></i> {t("Grafici")}</Link>
            </div>
          </div>
          <div className="flex w-full md:w-1/3 ">
            <div className="px-8 text-3xl">
              <Link to="/mappa" className=""><i className={`fas fa-globe fa-fw mr-3 text-green-600`}></i> {t("Map")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>



    {hasError &&
      <div className="bg-orange-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Ooops</p>
        <p>C'è stato un piccolo errore nel recupero dei dati aggiornati. Per favore riprova più tardi. Grazie!</p>
      </div>
    }
  </>;
};

export default Main;
