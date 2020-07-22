const { pool } = require('./config/database');

const data = [
    {'user_id': 1, 'category_id': 1, 'name': 'Groceries', 'amount': 200, 'expense_date': '2020-07-16'},
    {'user_id': 1, 'category_id': 1, 'name': 'McDonalds', 'amount': 15, 'expense_date': '2020-07-21'},
    {'user_id': 1, 'category_id': 1, 'name': 'Birthday Cake', 'amount': 40, 'expense_date': '2020-07-21'},
    {'user_id': 1, 'category_id': 3, 'name': 'Rent', 'amount': 1000, 'expense_date': '2020-07-23'},
    {'user_id': 1, 'category_id': 3, 'name': 'Phone Bill', 'amount': 70, 'expense_date': '2020-07-10'},
    {'user_id': 1, 'category_id': 3, 'name': 'Hydro', 'amount': 40, 'expense_date': '2020-07-01'},
    {'user_id': 1, 'category_id': 3, 'name': 'Internet', 'amount': 60, 'expense_date': '2020-07-20'},
    {'user_id': 1, 'category_id': 4, 'name': 'Uniqlo', 'amount': 100, 'expense_date': '2020-07-14'},
    {'user_id': 1, 'category_id': 4, 'name': 'Gucci', 'amount': 1500, 'expense_date': '2020-07-14'},
    {'user_id': 1, 'category_id': 4, 'name': 'LV', 'amount': 3000, 'expense_date': '2020-07-14'},
    {'user_id': 1, 'category_id': 6, 'name': 'Trip to Japan', 'amount': 4000, 'expense_date': '2020-07-01'},
    {'user_id': 1, 'category_id': 6, 'name': 'Trip to Hong Kong', 'amount': 3000, 'expense_date': '2020-05-12'},
    {'user_id': 1, 'category_id': 7, 'name': 'Avengers: End Game', 'amount': 20} 
]



pool.query('TRUNCATE expenses RESTART IDENTITY CASCADE')
.then((console.log('Expenses deleted and resequenced')))

for (var i = 0; i < data.length; i++) {
    pool.query('INSERT INTO expenses (user_id, category_id, name, amount, expense_date) VALUES ($1, $2, $3, $4, $5)', [data[i]['user_id'], data[i]['category_id'], data[i]['name'], data[i]['amount'], data[i]['expense_date']], (err, result) => {
        if (err){
            console.log(err)
            // break;
        }
        console.log(result)
    })    
}
