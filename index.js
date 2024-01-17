const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const path = require('path');

const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'statistic/users.csv',
    header: [
        { id: 'ID', title: 'ID' },
        { id: 'Level0', title: 'Level0' },
        { id: 'Level1', title: 'Level1' },
        { id: 'Level2', title: 'Level2' },
        { id: 'Level3', title: 'Level3' },
        { id: 'Level4', title: 'Level4' },
        { id: 'Level5', title: 'Level5' },
        { id: 'Level6', title: 'Level6' },
        { id: 'Level7', title: 'Level7' },
        { id: 'Level8', title: 'Level8' },
        { id: 'Level9', title: 'Level9' },
        { id: 'Level10', title: 'Level10' },
        { id: 'Level11', title: 'Level11' },
    ],
    append: false
});

app.use(bodyParser.urlencoded({ extended: true }));

last_try = new Map();
fs.createReadStream('statistic/users.csv')
    .pipe(csv())
    .on('data', (data) => {
        last_try.set(data.ID, 0)
    })


app.get('/', (req,res)=>{
    res.sendFile(__dirname + `/pages/html/index.html`);
})

app.post('/submit-ans-form', (request, response) => {
    let currentDate = new Date();
    currentDate = currentDate.getTime();
    if (!last_try.has(request.body.userID)) {
        response.json({ message: 'wrong ID' });
        return
    }
    else if (currentDate - last_try[request.body.userID] <= 10000) {
        response.json({ message: 'Wait 10 seconds and try again' });
        return
    }
    else {
        last_try[request.body.userID] = currentDate
    }
    checkChange = false
    fs.readFile(__dirname + `/anss/${request.body.ans}.txt`, 'utf-8', (error, text) => {
        if (error) {
            response.json({ message: 'It is wrong answer, try again' });
            return
        } else {
            table = []
            fs.createReadStream('statistic/users.csv')
                .pipe(csv())
                .on('data', (data) => {
                    if (data.ID == request.body.userID) {
                        if (data[`Level${text.split('\r')[0]}`] == '0') {
                            checkChange = true
                            let currentDate = new Date();
                            let formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
                            data[`Level${text.split('\r')[0]}`] = formattedDate
                        }
                        response.json({ message: text.split('\r')[1] });
                    }
                    table.push(data);
                })
                .on('end', () => {

                    if (checkChange) {
                        csvWriter.writeRecords(table)
                            .then(() => {
                                table = []
                            });
                    }
                });
        }
    });
});

app.post('/submit-idea-form', (request, response) => {
    let currentDate = new Date();

    if (!last_try.has(request.body.ID)) {
        response.json({ message: 'wrong ID' });
        return
    }
    else if (currentDate - last_try[request.body.userID] <= 10000) {
        response.json({ message: 'Wait 10 seconds and try again' });
        return
    }
    else {
        last_try[request.body.userID] = currentDate
    }

    let formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');

    fs.appendFile('statistic/ideas.txt', request.body.Text + ': ' + formattedDate + '\n', (err) => {
        if (err) {
            response.json({ message: 'Error' });
        } else {

            response.json({ message: 'Idea is saved' });
        }
    });

});
app.use((req, res, next) => {
    if ('.txt' == path.extname(req.url) && '.csv' == path.extname(req.url)) {
        res.status(500).send('no access')
    }
    else if ('.html' == path.extname(req.url)){
        res.sendFile(__dirname + `/pages/html${req.url}`);
    }
    else{
        res.sendFile(__dirname + `/pages${req.url}`);
    }
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});