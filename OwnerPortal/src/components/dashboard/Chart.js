import React from "react";
import PropTypes from "prop-types";
import { Line, Doughnut, Pie, Bar, HorizontalBar } from "react-chartjs-2";
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};
const Linedata = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};
const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};
const Bardata = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};
const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14,
  },
};

const options = {
  title: {
    display: true,
    text: "Chart Title",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    ],
  },
};

const Chart = (props) => {
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Doughnut</h6>
          </div>
          <div className="card-body">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card shadow">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Line</h6>
          </div>
          <div className="card-body">
            <Line data={lineData} legend={legend} options={options} />
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card shadow">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Line</h6>
          </div>
          <div className="card-body">
            <Line data={Linedata} />
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card shadow">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">PIE</h6>
          </div>
          <div className="card-body">
            <Pie
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card shadow">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Bar</h6>
          </div>
          <div className="card-body">
            <Bar data={Bardata} width={100} height={50} options={{}} />
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card shadow">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Bar</h6>
          </div>
          <div className="card-body">
            <HorizontalBar
              data={Bardata}
              width={100}
              height={50}
              options={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Chart.propTypes = {};

export default Chart;
