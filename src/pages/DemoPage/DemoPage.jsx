import React, {useState, useEffect} from 'react';
import './DemoPage.css';
import expenseService from '../../utils/expenseService';

function DemoPage({history}) {
    const [totalAmount, setTotalAmount] = useState();
    const [currentAmount, setCurrentAmount] = useState();

    useEffect(() => {
        // when searching up specific users use the following below:
        // const amount = await expenseService.getMonthlyCost('/api/expenses', {user: 2})
        async function getCost() { 
            const result = await expenseService.getMonthlyCost('/api/expenses')
            setTotalAmount(result.total_amount)
            setCurrentAmount(result.current_amount)
            return
        };

        getCost();
    }, [])

    return (
        <div className = 'month-preview'>
            <h1>Quick View for July, 2020</h1>
            <h2>July Expenditures: {currentAmount}</h2>
            <h2>Total Amount Since Started Tracking {totalAmount}</h2>
        </div>
    )
};

export default DemoPage;