import * as React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import MetricItem from "./MetricItem";

interface IMetricDataItemProps {
  data: any[],
  field: string,
  icon: string,
  color: string,
  showChange?: boolean
}

export default function MetricDataItem(props: IMetricDataItemProps) {
  const { t } = useTranslation();


  let getPercentageChange = (newNumber: number, oldNumber: number) => {
    //console.log()
    var increaseValue = newNumber - oldNumber;
    console.log(oldNumber, newNumber, increaseValue);
    return Math.floor((increaseValue / Math.abs(oldNumber)) * 100);
  }
  let locale = i18n.language === "it" ? "it-IT" : "en-US";

  if (props.data.length > 0) {
    let idx = props.data.length - 1;
    let valore = props.data[idx][props.field];
    let valore_precedente = props.data[idx - 1][props.field];
    let valore_differenza = valore - valore_precedente;
    let valore_percentuale = getPercentageChange(valore, valore_precedente);
    let title = t("metrica_" + props.field);


    if (props.showChange) {
      valore = props.data[idx][props.field] - props.data[idx - 1][props.field];
      valore_precedente = props.data[idx - 1][props.field] - props.data[idx - 2][props.field]
      valore_differenza = valore - valore_precedente
      valore_percentuale = getPercentageChange(valore, valore_precedente);
      title = t("metrica_" + props.field + "_giornalieri");

    }

    return (

        <MetricItem
            title={title}
            color={props.color}
            value={valore}
            line1={t("rispetto_al_precedente") + ": " + valore_differenza}
            line2={t("precedente")+": "+valore_precedente}
            line3={t("variazione_percentuale")+": "+ valore_percentuale+"%"}
            icon={props.icon}
        />
    );
  } else {
    return (<div>Loading Data</div>);
  }

};
