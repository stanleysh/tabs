import React, {useEffect} from 'react';
import './WelcomePage.css';
// import Chart from 'chart.js';
import {Pie, Doughnut} from 'react-chartjs-2';



const WelcomePage = (props) => {
    
var labels = ['Rent', 'Food/Groceries', 'Savings', 'Luxury', 'Utilities']

var datasets = [
    {
        label: 'Expenditures',
        backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
    ],
    hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
    ],
    data: [1200, 500, 800, 324, 156]
    }
]

    if (props.user) {
        return (
            <>
                <div className="welcome-banner fade-in-1">
                    <p>Nice to meet you! Im your personal interview assistant :{")"}</p>
                </div>
                <div className="welcome-message fade-in-2">
                    <p>I'm here to provide you with the most relevant interview questions for the industry of your choice, curated answer scripts and tools to help you prep with confidence!</p>
                </div> 
            </>
        )
    }

    return (
        <div>
            <div className="fade-in-1">
                <h1>A clean simple way to help track your finances</h1>
            </div>
            <div className="chart-example">
                <div className="chart-1">
                    <Doughnut 
                        data={{labels, datasets}}
                        options = {{
                            title: {
                                display: true,
                                text: "Monthly Expenditure", 
                                fontSize: 20
                            },
                            legend: {
                                display:true,
                                position:'right'
                            },
                            tooltips: {
                                callbacks: {
                                    title: function(tooltipItem, data) {
                                        return data['labels'][tooltipItem[0]['index']];
                                    },
                                    label: function(tooltipItem, data) {
                                        return "$" + data['datasets'][0]['data'][tooltipItem['index']]
                                    },
                                    afterLabel: function(tooltipItem, data) {
                                        var dataset = data['datasets'][0];
                                        var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
                                        return '(' + percent + '%)';
                                    },
                                },
                                backgroundColor: '#FFF',
                                titleFontSize: 16,
                                titleFontColor: '#0066ff',
                                bodyFontColor: '#000',
                                bodyFontSize: 14,
                                displayColors: false
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default WelcomePage