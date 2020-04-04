import React, { /*useState,*/ useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';

export interface IChartProps {
  data: []
}


interface IDataset {
  label: string[];
  data: string[] | number[];
}

const Chart: React.FunctionComponent<IChartProps> = (props) => {

  //const [hasError, setErrors] = useState(false)
  //const [datasetForChart, setDatasetForChart] = useState<IDataset>(resetDataset())
  //const [data, setData] = useState<[]>([])


  /*
  useEffect(() => {

      setData(props.data);
  }, [props.data]);
  */

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
        res.label[index] = d.toLocaleDateString("it-IT", options);
        res.data[index] = element[attributeName];
      }
      return res;

    },
    [props.data]);
  //function loadDataset(attributeName: string): IDataset {
  //}

  const loadDatasetForChart = useCallback(
    (type: string) => {
      let confDataset = [{
        metric: "variazione_totale_positivi",
        r: 200,
        g: 200,
        b: 200,
        label: "Nuovi Positivi"
      }];
      if (type === "cumulative") {
        confDataset = [
          {
            metric: "ricoverati_con_sintomi",
            r: 200,
            g: 200,
            b: 82,
            label: "Ricoverati con Sintomi"
          },
          {
            metric: "dimessi_guariti",
            r: 132,
            g: 255,
            b: 132,
            label: "Dimessi Guariti"
          },
          {
            metric: "totale_casi",
            r: 99,
            g: 0,
            b: 99,
            label: "Totale Casi"
          },
          {
            metric: "tamponi",
            r: 255,
            g: 0,
            b: 255,
            label: "Tamponi"
          }
        ];
      } else if (type === "daily") {
        confDataset = [
          {
            metric: "variazione_totale_positivi",
            r: 200,
            g: 200,
            b: 200,
            label: "Nuovi Positivi"
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
    }, [loadDataset]
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
              Grafico Dati Cumulativi
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
              Grafico Dati Giornalieri
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
