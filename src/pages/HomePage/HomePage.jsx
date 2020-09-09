import React, {useState, useEffect} from 'react';
import expenseService from '../../utils/expenseService';

import './HomePage.css'

function HomePage(History) {
    const [totalAmount, setTotalAmount] = useState();
    const [currentAmount, setCurrentAmount] = useState();
    const [date, setDate] = useState([])

    useEffect(() => {
        // when searching up specific users use the following below:
        // const amount = await expenseService.getMonthlyCost('/api/expenses', {user: 2})
        async function getCost() { 
            const result = await expenseService.getMonthlyCost('/api/expenses')
            setTotalAmount(result.total_amount)
            setCurrentAmount(result.current_amount)
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
    }, [])


    return (        
    <div>
        <div className="fade-in-1">
            <h1>Homepage placeholder</h1>
        </div>
        
    </div>
    )
}

export default HomePage