import * as React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import MetricDataItem from "./MetricDataItem";
import MetricItem from "./MetricItem";

interface IMetricsProps {
  region: string
  data: any[]
}

export default function Metrics(props: IMetricsProps) {

  const { t } = useTranslation();
  let locale = i18n.language === "it" ? "it-IT": "en-US";
  if (props.data.length > 0) {
    let idx = props.data.length -1;

    return (
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricItem
            title={props.region === "all" ? t("Italia") : props.region }
            color="green"
            icon="calendar"
            value={new Date(props.data[idx].data).toLocaleDateString(locale, { month: 'long', day: 'numeric' })}
            line1={new Date(props.data[idx].data).toLocaleDateString(locale, { weekday: 'long' })}
            line2={t("ultimo_aggiornamento")}
            line3={ "Today: " + new Date().toLocaleDateString(locale, { month: 'long', day: 'numeric' })}
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="nuovi_positivi"
            color="orange"
            icon="ambulance"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="dimessi_guariti"
            color="green"
            icon="smile"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="totale_ospedalizzati"
            color="red"
            icon="hospital"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="deceduti"
            color="gray"
            icon="skull"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="variazione_totale_positivi"
            color="orange"
            icon="ambulance"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="totale_positivi"
            color="red"
            icon="ambulance"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="tamponi"
            color="yellow"
            icon="vial"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="tamponi"
            color="yellow"
            icon="vial"
            showChange={true}
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="ricoverati_con_sintomi"
            color="red"
            icon="hospital"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="terapia_intensiva"
            color="red"
            icon="hospital"
          />
        </div>


        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="isolamento_domiciliare"
            color="orange"
            icon="home"
          />
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <MetricDataItem
            data={props.data}
            field="totale_casi"
            color="red"
            icon="hospital"
          />
        </div>






      </div>
    );
  } else {
    return (<div>Loading Data</div>);
  }

};
