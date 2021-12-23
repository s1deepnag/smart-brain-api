const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const app = express();

const db = knex({
            client: 'pg',
            connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
            }
        });

app.use(bodyParser.json());
app.use(cors());

// db.select('*').from('users').then(data => {
//     console.log('users table has:', data);
// });

app.get('/', (req, res) => {
    res.send('It\'s working')
    // db.select('*').from('users').then(data => {
    //     console.log('users table has:', data);
    //     res.json(data);
    // });
    //res.json(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)} )

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleImageUrl(req, res)})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server app is running on port ${process.env.PORT}` );
})


/* These are the end points we expect and how we'll respond to them

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/userId --> GET = user
/image --> PUT --> user

*/