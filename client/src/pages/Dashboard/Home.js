import { useEffect } from "react";
import { Col, Spinner } from "react-bootstrap";
import { Chart, Bars, Labels } from "rumble-charts";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";

import { bCgetAllFiles } from "../../actions/file";

import { CircularProgress } from "../../components/Util/Utils";

function data(values) {
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "No of logs",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function HomePage() {
  //   const dataState = useSelector((state) => state.dataState);
  const dispatch = useDispatch();

  const files = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(bCgetAllFiles());
  }, [dispatch]);

  return !files.length ? (
    <CircularProgress />
  ) : (
    <Col>
      <div className="home-container">
        <div className="home-graph-container">
          <div className="home-graph-item">
            <div className="home-graph-item-left">
              <div className="home-graph-item-left-item bg1 flex-center">
                <img
                  width={25}
                  height={25}
                  // className="menu-logo"
                  src="./assets/svg/item.svg"
                  alt=""
                />
              </div>
              <div className="home-graph-item-left-item flex-center gray-item">
                Users
              </div>
              {/* <div className="home-graph-item-left-item flex-center white-item">
                  {dataState.noOfUsers}
                </div> */}
              <div className="home-graph-item-left-item flex-center white-item">
                {2}
              </div>
            </div>
            <div className="home-graph-item-right"></div>
          </div>
          <div className="home-graph-item">
            <div className="home-graph-item-left">
              <div className="home-graph-item-left-item bg2 flex-center">
                <img
                  width={25}
                  height={25}
                  // className="menu-logo"
                  src="./assets/svg/upload.svg"
                  alt=""
                />
              </div>
              <div className="home-graph-item-left-item flex-center gray-item">
                Uploaded
              </div>
              <div className="home-graph-item-left-item flex-center white-item">
                {1}
              </div>
              {/* <div className="home-graph-item-left-item flex-center white-item">
                  {dataState.noOfUploads}
                </div> */}
            </div>
            <div className="home-graph-item-right"></div>
          </div>
          <div className="home-graph-item">
            <div className="home-graph-item-left">
              <div className="home-graph-item-left-item bg3 flex-center">
                <img
                  width={25}
                  height={25}
                  // className="menu-logo"
                  src="./assets/svg/circular.svg"
                  alt=""
                />
              </div>
              <div className="home-graph-item-left-item flex-center gray-item">
                Nodes
              </div>
              {/* <div className="home-graph-item-left-item flex-center white-item">{dataState.noOfNodes}</div> */}
              <div className="home-graph-item-left-item flex-center white-item">
                {1}
              </div>
            </div>
            <div className="home-graph-item-right"></div>
          </div>
        </div>
        <div className="home-main-graph-container">
          <div className="home-main-graph-bar">
            {/* <Bar data={data(dataState.logMonthlyBreakdown)} options={options} /> */}
            <Bar data={1} options={options} />
          </div>
        </div>
      </div>
    </Col>
  );
}
