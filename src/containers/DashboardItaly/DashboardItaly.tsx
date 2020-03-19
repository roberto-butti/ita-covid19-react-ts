import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import "./DashboardItaly.css";
import Loading from "../../components/Loading/Loading";
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
  loading: boolean;
  error: boolean;
  dataChart: any;
}

interface IDataset {
  label: string[];
  data: string[] | number[];
}

class DashboardItaly extends Component<IProps, IState> {
  

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: false,
      dataChart: {}
    };
  }

  loadDatasetCharts() {

    
    let dataset: IDataset = this.dataset("dimessi_guariti", "");
    let datasetTotaleCasi: IDataset = this.dataset("totale_casi", "");
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

    ]};
    this.setState({ dataChart: data });

  }

  dataset(attributeName: string, region: string): IDataset {

    let data =[];
    if (region === "") {
        data = this.state.data
    } else {
        data = this.state.data.filter((d: any) => d.denominazione_regione === region)
    }

    let res: IDataset = {
      label: [],
      data: []
    }
    for (let index = 0; index < data.length; index++) {
      let element = data[index];
      let d = new Date(element.data);
      let options = { weekday: 'short',  month: 'short', day: 'numeric' };
      res.label[index] = d.toLocaleDateString("it-IT", options);
  //let d = new Date();
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
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
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
        {loading && <Loading></Loading>}
        <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full md:w-1/2 p-3">
              <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                  <h5 className="uppercase text-grey-dark">Italia</h5>
                </div>
                <div className="p-5">
                  <Line data={dataChart} />
                </div>
              </div>
            </div>

          
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
export default DashboardItaly;
