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

  let palette = {
    red: [244, 67, 54],
    pink: [233, 30, 99],
    purple: [156, 39, 176],
    deep_purple: [103, 58, 183],
    indigo: [63, 81, 181],
    blue: [33, 150, 243],
    light_blue: [3, 169, 244],
    cyan: [0, 188, 212],
    teal: [0, 150, 136],
    green: [76, 175, 80],
    light_green: [139, 195, 74],
    lime: [205, 220, 57],
    yellow: [255, 235, 59],
    amber: [255, 193, 7],
    orange: [255, 152, 0],
    deep_orange: [255, 87, 34],
    brown: [121, 85, 72],
    grey: [158, 158, 158],
    blue_grey: [96, 125, 139]

  }

  const loadDatasetForChart = useCallback(
    (type: string) => {
      let confDataset = [{
        metric: "totale_positivi",
        r: palette.indigo[0],
        g: palette.indigo[1],
        b: palette.indigo[2],
        label: t("metrica_totale_positivi")
      }];
      if (type === "cumulative") {
        confDataset = [
          {
            metric: "dimessi_guariti",
            r: palette.lime[0],
            g: palette.lime[1],
            b: palette.lime[2],
            label: t("metrica_dimessi_guariti")
          },
          {
            metric: "deceduti",
            r: palette.blue[0],
            g: palette.blue[1],
            b: palette.blue[2],
            label: t("metrica_deceduti")
          },
          {
            metric: "totale_casi",
            r: palette.yellow[0],
            g: palette.yellow[1],
            b: palette.yellow[2],
            label: t("metrica_totale_casi")
          },
          {
            metric: "tamponi",
            r: palette.amber[0],
            g: palette.amber[1],
            b: palette.amber[2],
            label: t("metrica_tamponi")
          }
        ];
      } else if (type === "daily") {
        confDataset = [
          {
            metric: "nuovi_positivi",
            r: palette.indigo[0],
            g: palette.indigo[1],
            b: palette.indigo[2],
            label: t("metrica_nuovi_positivi")
          },
          {
            metric: "totale_positivi",
            r: palette.blue[0],
            g: palette.blue[1],
            b: palette.blue[2],
            label: t("metrica_totale_positivi")
          },
          {
            metric: "ricoverati_con_sintomi",
            r: palette.red[0],
            g: palette.red[1],
            b: palette.red[2],
            label: t("metrica_ricoverati_con_sintomi")
          },
          {
            metric: "isolamento_domiciliare",
            r: palette.pink[0],
            g: palette.pink[1],
            b: palette.pink[2],
            label: t("metrica_isolamento_domiciliare")
          },
          {
            metric: "totale_ospedalizzati",
            r: palette.purple[0],
            g: palette.purple[1],
            b: palette.purple[2],
            label: t("metrica_totale_ospedalizzati")
          },


        ];
      } else if (type === "change") {
        confDataset = [
          {
            metric: "variazione_totale_positivi",
            r: palette.orange[0],
            g: palette.orange[1],
            b: palette.orange[2],
            label: t("metrica_variazione_totale_positivi")
          }]
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
      borderWidth: 2,
      fill: false,


      lineTension: 0.4,
      backgroundColor: 'rgba(' + element.r + ',' + element.g + ',' + element.b + ',0.4)',

      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(' + element.r + ',' + element.g + ',' + element.b + ',0.6)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(' + element.r + ',' + element.g + ',' + element.b + ',0.4)',
      pointHoverBorderColor: 'rgba(' + element.r + ',' + element.g + ',' + element.b + ',1)',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      //steppedLine: true,



      data: currentDataset.data,

    }

  )

}
return {
  labels: labels,
  datasets: datasets
}
    }, [loadDataset, palette.amber, palette.blue, palette.indigo, palette.lime, palette.orange, palette.pink, palette.purple, palette.red, palette.yellow, t]
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
      <div className="w-full   p-3">
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
      <div className="w-full md:w-1/2 p-3">
        <div className="bg-white border rounded shadow">
          <div className="border-b p-3">
            <h5 className="font-bold uppercase text-gray-600">
              {t("grafico_variazioni")}
            </h5>
          </div>
          <div className="p-5">
            <Line data={loadDatasetForChart("change")} height={400}
              options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-3">
        <div className="bg-white border rounded shadow">
          <div className="border-b p-3">
            <h5 className="font-bold uppercase text-gray-600">
              {t("grafico_dati_cumulativi")}
            </h5>
          </div>
          <div className="p-5">
            <Line data={loadDatasetForChart("cumulative")} height={400}
              options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

    </div>
  </>
);
}


export default Chart;
