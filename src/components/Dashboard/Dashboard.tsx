import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import "./Dashboard.css";
/*
declare global {
  interface Window {
    //H: any;
  }
}
*/

interface IProps {
  debug?: boolean;
}
interface IState {
  data: any;
  region: string;
  loading: boolean;
  error: boolean;
  dataChart: any;
}

interface IDataset {
  label: string[];
  data: string[] | number[];
}

class Dashboard extends Component<IProps, IState> {
  regions: string[] = ["Veneto", "Lombardia", "Lazio"];

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      region: "Veneto",
      loading: false,
      error: false,
      dataChart: {}
    };
  }

  loadDatasetCharts() {

    let dataRegions: any = {};
    this.regions.map((region, index) => {
    let dataset: IDataset = this.dataset("dimessi_guariti", region);
    let datasetTotaleCasi: IDataset = this.dataset("totale_casi", region);
    let data = {
      labels: dataset.label,
      datasets: [
        {
          label: 'Dimessi Guariti',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 3,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: dataset.data
        },
        {
          label: 'Totale Casi',
          //backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(132,99,255,1)',
          borderWidth: 3,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: datasetTotaleCasi.data
        },

      ]
    };
    dataRegions[region]= data;
    
    })
    this.setState({ dataChart: dataRegions });

  }

  dataset(attributeName: string, region: string): IDataset {

    let data = this.state.data.filter((d: any) => d.denominazione_regione === region)
    let res: IDataset = {
      label: [],
      data: []
    }
    for (let index = 0; index < data.length; index++) {
      let element = data[index];
      res.label[index] = element.data;
      res.data[index] = element[attributeName];
    }
    return res;
  }

  manageData(response: any) {
    console.log(response);
    //response = response.filter((d: any) => d.denominazione_regione === this.state.region)
    this.setState({
      data: response,
      loading: false
    })
    this.loadDatasetCharts();
  }

  componentDidMount() {
    this.setState({
      loading: true,
      error: false
    });
    fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json"
    )
      .then(response => response.json())
      .then(response =>
        this.manageData(response)
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: true
        })
      );
  }
  render() {
    const { dataChart, data, loading, error } = this.state;

    return (
      <>
        {loading && <div>Loading...</div>}
        <div className="flex flex-row flex-wrap flex-grow mt-2">
          {this.regions.map((region, index) => {
            return <div className="w-full md:w-1/2 p-3">
              <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                  <h5 className="uppercase text-grey-dark">{region}</h5>
                </div>
                <div className="p-5">
                  <Line data={dataChart[region]} />
                </div>
              </div>
            </div>

          })}

          
        </div>


        {!loading && !error &&
          data.map((datas: any) => (
            <div key={datas.data + "-" + datas.denominazione_regione}>
              {datas.data} - {datas.denominazione_regione}
              - {datas.dimessi_guariti}
              - {datas.deceduti}

            </div>
          ))
        }

        <div className="Dashboard">
          <div className="dashboard" id="dashboard"></div>
        </div>
      </>
    );
  }
}
export default Dashboard;
