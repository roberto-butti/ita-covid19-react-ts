import * as React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

interface IMetricsProps {
  region: string
  data: any[]
}

export default function Metrics(props: IMetricsProps) {

  const { t } = useTranslation();

  let  getPercentageChange = (newNumber: number, oldNumber:number) =>{
    //console.log()
    var increaseValue = newNumber - oldNumber;
    console.log(oldNumber, newNumber, increaseValue);
    return Math.floor((increaseValue / Math.abs(oldNumber)) * 100);
  }
  let locale = i18n.language === "it" ? "it-IT": "en-US";
  //console.log("Language detected: ", locale);
  if (props.data.length > 0) {
    let idx = props.data.length -1;
    let variazione_totale_positivi = props.data[idx].variazione_totale_positivi;
    let variazione_totale_positivi_precedente = props.data[idx-1].variazione_totale_positivi;
    let variazione_totale_positivi_differenza = variazione_totale_positivi - variazione_totale_positivi_precedente;
    let variazione_totale_positivi_percentuale = getPercentageChange(variazione_totale_positivi, variazione_totale_positivi_precedente);

    let variazione_tamponi = props.data[idx].tamponi - props.data[idx - 1].tamponi;
    let variazione_tamponi_precedente = props.data[idx-1].tamponi - props.data[idx - 2].tamponi
    let variazione_tamponi_differenza = variazione_tamponi - variazione_tamponi_precedente
    let variazione_tamponi_percentuale = ((variazione_tamponi * 100 / variazione_tamponi_precedente) - 100).toFixed(2)

    return (
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">

          <div className="bg-green-100 border-b-4 border-green-600 rounded-lg shadow-lg p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-green-600"><i className="fa fa-calendar fa-2x fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-600">{props.region === "all" ? t("Italia") : props.region}</h5>
                <h3 className="font-bold text-3xl">{new Date(props.data[idx].data).toLocaleDateString(locale, {  month: 'long', day: 'numeric' })}</h3>
                <div className="text-xs">{new Date(props.data[idx].data).toLocaleDateString(locale, { weekday: 'long' })}</div>
                <div className="text-xs">{ t("ultimo_aggiornamento")}</div>
                <div className="text-xs">Today: {new Date().toLocaleDateString(locale, { month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
          </div>



        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">

          <div className="bg-green-100 border-b-4 border-orange-500 rounded-lg shadow-lg p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-orange-600"><i className="fa fa-ambulance fa-2x fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-orange-600">{t("metrica_variazione_totale_positivi")}</h5>
                <h3 className="font-bold text-3xl">{variazione_totale_positivi}</h3>
                <div className="text-xs">{t("rispetto_al_precedente")}: {variazione_totale_positivi_differenza} </div>
                <div className="text-xs">{t("precedente")}: {variazione_totale_positivi_precedente}</div>
                <div className="text-xs">{t("variazione_percentuale")}: {variazione_totale_positivi_percentuale}%</div>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">

          <div className="bg-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-lg p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-yellow-600"><i className="fas fa-vial fa-2x fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-600">{t("metrica_tamponi_giornalieri")}</h5>
                <h3 className="font-bold text-3xl">{ variazione_tamponi }</h3>
                <div className="text-xs">{t("rispetto_al_precedente")}: { variazione_tamponi_differenza} </div>
                <div className="text-xs">{t("precedente")}: {variazione_tamponi_precedente} </div>
                <div className="text-xs">{t("variazione_percentuale")}: {variazione_tamponi_percentuale}% </div>
              </div>
            </div>
          </div>


        </div>


      </div>
    );
  } else {
    return (<div>Loading Data</div>);
  }

};
