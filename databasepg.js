
const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "0806",
    database: "postgres"
});

client.connect((err) => {
    if (err) {
        console.error('Failed to connect to PostgreSQL:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database!');
    }
});


client.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('Failed to execute query:', err.stack);
    } else {
        console.log('Query result:', res.rows);
    }

    // close the client object after all queries are executed
    client.end((endErr) => {
        if (endErr) {
            console.error('Failed to close PostgreSQL client:', endErr.stack);
        } else {
            console.log('PostgreSQL client has been disconnected.');
        }
    });
});