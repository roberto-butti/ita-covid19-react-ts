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
        this.setState({
          data: response.results,
          loading: false
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: true
        })
      );
  }
  render() {
    return (
      <div className="Dashboard">
        <div className="dashboard" id="dashboard"></div>
      </div>
    );
  }
}
export default Dashboard;
