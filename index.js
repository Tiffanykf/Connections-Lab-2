process.env.API-KEY
process.env.MONGODB-URL

//DB - 0 - install and load lowdb module
import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log('listening at ', port);
});


let app = express();


//DB - 1 - connect to the DB
let defaultData = {lineTrackerData:[]};
let adapter = new JSONFile('db.json');
let db = new Low(adapter, defaultData); //asks lowdb to use this json file to create a database with empty array coffeeTrackerData

app.use(express.json()); //parses JSON


// 2. Add a route on server that is listening for a post request

app.post('/andThen', (req,res)=>{
    console.log(req.body);
    let obj = {
        author: req.body.author,
        line: req.body.line,
    }

//DB - 2 - add value to the DB
db.data.lineTrackerData.push(obj);
db.write()
.then(()=>{
    res.json({task:"success"});
})
})

app.use('/', express.static('public'));

app.listen(3000, ()=>{
    console.log("listening at localhost:3000");
})


//3. add route to get all coffee tracking info
app.get('/andThen', (req,res)=>{

    //DB - 3 - fetch from the DB
    db.read()
    .then(() =>{
        let obj = {data: db.data.lineTrackerData};
        res.json(obj);
    })
})