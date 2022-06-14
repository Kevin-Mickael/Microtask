import React from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const Chart = (props) => {
  // Get all dates from items
  let taskDates = [];
  props.items.map((task) => {
    return taskDates.push(moment(task.date).format("YYYYMMDD"));
  });
  // Remove duplicates
  taskDates = [...new Set(taskDates)];
  // Sort array
  taskDates.reverse();
  // Display a week's data only
  taskDates = taskDates.slice(0,6);
  taskDates.sort();

  // Reformat dates
  taskDates = taskDates.map((d) => {
    return moment(
      new Date(
        d.substring(0, 4),
        parseInt(d.substring(4, 6)) - 1,
        d.substring(6, 9)
      )
    ).format("MMM DD, YYYY");
  });

  // console.log(taskDates);

  const labels = taskDates;

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((l) => {
          let sumMinutes = 0;
          let sumSeconds = 0;
          let sumHours = 0;

          for (let i = 0; i < props.items.length; i++) {
            if (l === moment(props.items[i].date).format("MMM DD, YYYY")) {
              sumMinutes +=
                parseInt(props.items[i].minute) *
                parseInt(props.items[i].count);
              sumSeconds +=
                parseInt(props.items[i].second) *
                parseInt(props.items[i].count);
            }
          }
          sumHours += (sumMinutes * 60 + sumSeconds) / 60 / 60;

          return sumHours;
        }),
        backgroundColor: "#827717",
      },
    ],
  };

  console.log(props.items);

  return <Bar options={options} data={data} />;
};

export default Chart;
