import React, {Component, useState, useEffect} from 'react';
import './DemoPage.css';
import expenseService from '../../utils/expenseService';

function DemoPage({history}) {
    const [totalAmount, setTotalAmount] = useState();
    const [currentAmount, setCurrentAmount] = useState();
    const [date, setDate] = useState([])

    useEffect(() => {
        // when searching up specific users use the following below:
        // const amount = await expenseService.getMonthlyCost('/api/expenses', {user: 2})
        async function getCost() { 
            const result = await expenseService.getMonthlyCost('/api/expenses')
            setTotalAmount(result.total_amount)
            return
        };

        function getCurrentDate() {
            const months = {0:'January', 1:'February', 2:'March', 3:'April', 4:'May', 5:'June', 6:'July', 7:'August', 8: 'September', 9:'October', 10: 'November', 11: 'December'}
            let d = new Date()
            let currentMonth = d.getMonth()
            let currentYear = d.getFullYear()
            setDate([months[currentMonth], currentYear])
            return
        }

        getCost();
        getCurrentDate();
    }, [date])

    return (
        <div className = 'month-preview'>
            <h1>Quick View for {date[0]}, {date[1]}</h1>
            <h2>{date[0]} Expenditures: </h2>
            <h2>First Chart {totalAmount}</h2>
            {/* <h2>Second chart {currentAmount}</h2> */}
        </div>
    )
};

export default DemoPage;