// CREATE TABLE group_memebers (group_id int4 REFERENCES groups(group_id) ON UPDATE CASCADE ON DELETE CASCADE, member_id int4 REFERENCES users(id) ON UPDATE CASCADE,

// Updating expenses using total amount from expense table
// WITH total as (SELECT user_id, SUM(amount) as total_expense FROM expenses GROUP BY user_id) UPDATE users SET current_funds = total.total_expense FROM total WHERE users.id = total.user_id