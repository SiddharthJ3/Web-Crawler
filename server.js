const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = 'sid';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwerty@12345',
    database: 'data'
});

db.connect((err) => {
    if(err)
    {
        throw err;
    }
    console.log('MySQL database connected');
});

function verifyToken(req, res, next)
{
    const token = req.headers['authorization'];

    if(!token)
    {
        return res.json({ message: "Token is required"});
    }

    const tokenWithoutBearer = token.replace("Bearer ", "");

    jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
        if(err)
        {
            return res.json({ message: "Invalid Token" });
        }
        req.user = decoded;
        next();
    })
}

app.use(express.json());

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';

    db.query(sql, [username], (err, results) => {
        if(err)
        {
            throw err
        }
        if(results.length > 0)
        {
            return res.json({ message: "Username already exists" });
        }

        const sqlInster = 'INSERT INTO users (username, password) VALUES (?, ?)';
        
        db.query(sqlInster, [username, password], (err, result) => {
            if(err)
            {
                throw err
            }

            return res.json({ message: "New user created!" });
        });
    });
});

app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';

    db.query(sql, [username], (err, result) => {
        if(err)
        {
            throw err;
        }

        if(result.length > 0)
        {
            const user = result[0];

            if(user.password === password)
            {
                const token = jwt.sign({ username }, secretKey, {expiresIn: '1h' });
                return res.json({ token });
            }
        }

        res.json({ message: "Invalid username or password" });
    })
});

app.get('/api/data', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM products';

    db.query(sql, (err, results) => {
        if(err)
        {
            throw err;
        }

        res.json(results);
    });
});


app.listen(PORT, ()=> {
    console.log(`Server is running on the PORT ${PORT}`);
})