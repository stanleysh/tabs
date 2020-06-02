import React, {useEffect} from 'react';
import './WelcomePage.css';
import {Pie, Doughnut} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      maxHeight: 300,
      color: 'black',
      margin: 'auto',
      maxHeight: 300,
      overflow: 'auto',
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    price: {
        textAlign: 'right'
    }
  }));


const WelcomePage = (props) => {
    const classes = useStyles();
    
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
        data: [-1200, -450, 800, -320, -180]
        }
    ]

    var exampleOptions = {
        title: {
            display: true,
            text: "March Expenses", 
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
                    return "$ " + data['datasets'][0]['data'][tooltipItem['index']]
                },
                afterLabel: function(tooltipItem, data) {
                    var dataset = data['datasets'][0];
                    var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
                    if (percent < 0)
                        percent = -percent
                    return '(' + percent + '%)';
                },
            },
            backgroundColor: '#FFF',
            titleFontSize: 16,
            titleFontColor: '#05286B',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        }
    }

    const objectExampleListValues = {"Savings": [{"Income": 800}], "Rent": [{"Rent":-1200}], "Food/Groceries": [{"Groceries 3/2/2020":-100}, {"Groceries 3/10/2020":-100}, {"Groceries 3/22/2020":-100}, {"Fast food":-20}, {"Sushi": -50}, {"Fancy Dinner": -80}], "Luxury": [{"Shoes": -120}, {"Computer Keyboard": -140}, {"Video Game":-60}], "Utilities": [{"Phone Bill":-80}, {"Hydro": -60}, {"Internet":-40}]}

    var objectExampleList =     
    <List className={classes.root} subheader={<li />}>
        {Object.keys(objectExampleListValues).map((sectionId) => (
            <li key={`section-${sectionId}`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>{`${sectionId}`}</ListSubheader>
                    {objectExampleListValues[sectionId].map((item) => (
                        Object.keys(item).map((individualExpense) => (
                        <ListItem key={`item-${sectionId}-${item}`} >
                            <ListItemText primary={`${individualExpense} `} />
                            <ListItemText primary={`$ ${item[individualExpense]}`} className={classes.price}/>
                        </ListItem>
                        ))))}
                </ul>
            </li>
        ))}
    </List>

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
                        options = {exampleOptions}
                    />
                </div>
                <h3>See monthly breakdown of your finances. Click the category names to filter the chart to see the only the categories you want to see. </h3>
            </div>
            <div className="transaction-history">
                <h3>See breakdown of expenses for each specific category.</h3>
                {objectExampleList}
            </div> 
            <div className="group-example">
                <img></img>
                <h3>Create groups with your friends and family to help with splitting the bill.</h3>
            </div>
        </div>
    )
}

export default WelcomePage