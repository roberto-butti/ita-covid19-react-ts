import React, { Component } from "react";
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
}

class Dashboard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      region: "Veneto",
      loading: false,
      error: false
    };
  }

  manageData(response: any){
    console.log(response);
    response = response.filter( (d: any) => d.denominazione_regione === this.state.region)
    this.setState({
          data: response,
          loading: false
        })
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
    const { data, loading, error } = this.state;

    return (
      <>
      {loading && <div>Loading...</div>}
      
      {!loading && !error && 
          data.map((datas: any) => (
            <div key={datas.data + "-"+datas.denominazione_regione}>
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
