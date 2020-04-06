import React, { /*useState, useEffect,*/ useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export interface IChartProps {
  data: []
}


interface IDataset {
  label: string[];
  data: string[] | number[];
}

const Chart: React.FunctionComponent<IChartProps> = (props) => {
  const { t } = useTranslation();

  let locale = i18n.language === "it" ? "it-IT" : "en-US";

  function resetDataset(): IDataset {
    return {
      label: [],
      data: []
    }
  }

  const loadDataset = useCallback(
    (attributeName: string) => {

      //let data = this.state.data.filter((d: any) => d.denominazione_regione === region)
      let res: IDataset = resetDataset()
      for (let index = 0; index < props.data.length; index++) {
        let element = props.data[index];
        let d = new Date(element["data"]);
        let options = { weekday: 'short', month: 'short', day: 'numeric' };
        res.label[index] = d.toLocaleDateString(locale, options);
        res.data[index] = element[attributeName];
      }
      return res;

    },
    [locale, props.data]);
  //function loadDataset(attributeName: string): IDataset {
  //}

  const loadDatasetForChart = useCallback(
    (type: string) => {
      let confDataset = [{
        metric: "variazione_totale_positivi",
        r: 200,
        g: 200,
        b: 200,
        label: t("metrica_variazione_totale_positivi")
      }];
      if (type === "cumulative") {
        confDataset = [
          {
            metric: "ricoverati_con_sintomi",
            r: 200,
            g: 200,
            b: 82,
            label: t("metrica_ricoverati_con_sintomi")
          },
          {
            metric: "dimessi_guariti",
            r: 132,
            g: 255,
            b: 132,
            label: t("metrica_dimessi_guariti")
          },
          {
            metric: "totale_casi",
            r: 99,
            g: 0,
            b: 99,
            label: t("metrica_totale_casi")
          },
          {
            metric: "tamponi",
            r: 255,
            g: 0,
            b: 255,
            label: t("metrica_tamponi")
          }
        ];
      } else if (type === "daily") {
        confDataset = [
          {
            metric: "variazione_totale_positivi",
            r: 200,
            g: 200,
            b: 200,
            label: t("metrica_variazione_totale_positivi")
          },
        ];
      }

let labels: string[] = [];
let datasets = [];
for (let index = 0; index < confDataset.length; index++) {
  const element = confDataset[index];
  let currentDataset: IDataset = loadDataset(element.metric);
  if (index === 0) {
    labels = currentDataset.label
  }
  datasets.push(
    {
      label: element.label,
      borderColor: 'rgba(' + element.r + ',' + element.g + ',' + element.b + ',1)',
      borderWidth: 1,
      fill: false,
      data: currentDataset.data,
      /*
      trendlineLinear: {
        style: "#3e95cd",
        lineStyle: "line",
        width: 1
      }
      */
    }

  )

}
return {
  labels: labels,
  datasets: datasets
}
    }, [loadDataset, t]
  );
  /*
useEffect(() => {
  //setData(props.data);
  loadDatasetForChart();
}, [loadDatasetForChart, props.data]);
*/

return (
  <>
    <hr className="border-b-2 border-gray-400 my-8 mx-4" />
    <div className="flex flex-row flex-wrap flex-grow mt-2">
      <div className="w-full md:w-1/2 p-3">
        <div className="bg-white border rounded shadow">
          <div className="border-b p-3">
            <h5 className="font-bold uppercase text-gray-600">
{ t("grafico_dati_cumulativi") }
              </h5>
          </div>
          <div className="p-5">
            <Line data={loadDatasetForChart("cumulative")} height={400}
              options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-3">
        <div className="bg-white border rounded shadow">
          <div className="border-b p-3">
            <h5 className="font-bold uppercase text-gray-600">
              {t("grafico_dati_giornalieri")}
              </h5>
          </div>
          <div className="p-5">
            <Line data={loadDatasetForChart("daily")} height={400}
              options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

    </div>
  </>
);
}


export default Chart;
