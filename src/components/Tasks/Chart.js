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
  maintainAspectRatio: false,
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
  // Sort tasks by date
  // .slice(0) copies the array
  const sortedTasks = props.items.slice(0).sort((a, b) => {
    return moment(a.date) > moment(b.date) ? 1 : -1;
  });

  // Get all dates from items
  let taskDates = [];
  sortedTasks.map((task) => {
    return taskDates.push(moment.utc(task.date).local().format("YYYYMMDD"));
  });
  // Remove duplicates
  taskDates = [...new Set(taskDates)];
  // Display maximum 7 days' data
  taskDates.reverse();
  taskDates = taskDates.slice(0, 7);
  taskDates.sort();

  // Reformat dates
  taskDates = taskDates.map((d) => {
    return moment(
      new Date(
        d.substring(0, 4),
        parseInt(d.substring(4, 6)) - 1,
        d.substring(6, 9)
      )
    ).format("MMM DD, YYYY (ddd)");
  });

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
            if (
              l === moment(props.items[i].date).format("MMM DD, YYYY (ddd)")
            ) {
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
        maxBarThickness: 100,
      },
    ],
  };

  console.log(props.items);

  return <Bar height="200px" options={options} data={data} />;
};

export default Chart;
