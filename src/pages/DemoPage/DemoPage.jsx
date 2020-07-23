import React, {Component} from 'react';
import './DemoPage.css';
import expenseService from '../../utils/expenseService';

class DemoPage extends Component {
    state = {
        headers: {}
    }

    async componentDidMount() {
        const amount = await expenseService.getMonthlyCost('/api/expenses/demo');
        this.setState({headers: amount})
    }

    render() {
        return (
            <div className = 'month-preview'>
                <h1>July 2020</h1>
                <h2>First Chart {this.state.headers['total_amount']}</h2>
                <h2>Second chart (month income)</h2>
            </div>
        )
    }
};

export default DemoPage;