const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const csvParser = require('csv-parser')

const app = express();
const PORT = process.env.PORT || 5000;

const users = [
    {
        username: 'user1',
        password: 'password1'
    },
    {
        username: 'users2',
        password: 'password2'
    }
];

const secretKey = 'sid';
const csvFilePath = 'data/data.csv';

app.use(express.json());

app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if(user)
    {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    }
    else 
    {
        res.json({ message: 'Invalid username or passowrd'});
    }
});

function verifyToken(req, res, next)
{
    const token = req.headers['authorization'];

    if(!token)
    {
        return res.json({ message: 'Token is required' });
    }

    const tokenWithoutBearer = token.replace("Bearer ", "");

    jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
}

app.get('/api/data', verifyToken, (req, res) => {
     res.setHeader("Content-Type", "application/json");

     const readStream = fs.createReadStream(csvFilePath);
     readStream
       .pipe(csvParser())
       .on("data", (row) => {
         res.write(JSON.stringify(row));
         res.write("\n");
       })
       .on("end", () => {
         res.end();
       })
       .on("error", (err) => {
         console.error(err);
         res.json({ message: "Internal Server Error" });
       });
    
});

app.listen(PORT, () => {
    console.log(`Server is running on the PORT ${PORT}`);
});