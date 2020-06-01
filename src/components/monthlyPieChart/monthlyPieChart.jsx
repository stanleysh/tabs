import React, {Component, useEffect} from 'react';
import Chart from 'chart.js';
import classes from './LineGraph.module.css';

const LineGraph = (props) => {
    chartRef = React.createRef();
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        new Chart (myChartRef, {
            type: "pie",
            data: {
                labels: ["Savings", "Expenses"],
                datasets: [
                    {
                        label: "what",
                        data: ["$5403", "$1234"],
                    }
                ]
            }
        })
    })
    return (
        <>
            <cavas id ="myChart" ref={chartRef}/>
        </>
    )
}

export default LineGraph;