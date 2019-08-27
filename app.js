const express = require('express')
const Book = require('./models/bookModel')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/bookRouter')(Book)
const fs = require('fs')

/* fILE SYSTEM START*/
// const data = fs.readFileSync('cla.json') // WHEN USING SYNC FUNCTION THE NEXT LINE OF CODE WILL NOT EXECUTE UNTIL READING THE ENTIRE JSON FILE
// //SAME LIKE ASYNC AWAIT
// const clas = JSON.parse(data)
// console.log(clas)

var obj = {
    clas: []
}
var json

/*THis part of the code is to add an object to an existing array (if condition should be there to check If the array is already available)
https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js*/
fs.readFile('cla.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        obj = JSON.parse(data); //now it an object
        obj.clas.push({
            "committerName": "mommy",
            "committerID": 5843
        }); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('cla.json', json, 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        }); // write it back 
    }
});

/*THis part of the code is to add an object to an existing array (if condition should be there to check If the array is already available)
https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js*/


// var obj = {}
// var committers = []
// fs.readFile('cla.json', 'utf8', function cb(err, data) {
//     if (err) {
//         console.log(err)

//     } else {
//         obj = JSON.parse(data);

//         obj.clas.map((element) => {
//             committers = element.committerName
//             console.log(committers)
//         })

// }
// })


/* This part of the code is to delete the object in an array https://stackoverflow.com/questions/40537990/removing-json-object-from-json-file */
// var data = fs.readFileSync('cla.json')
// var json = JSON.parse(data)
// var committers = json.clas
// const removeUserID = 1234;
// json.clas = committers.filter((committer) => {
//     return committer.committerID !== removeUserID
// });
// console.log(json.clas)

// fs.writeFileSync('cla.json', JSON.stringify(json, null, 2));

/* This part of the code is to delete the object in an array https://stackoverflow.com/questions/40537990/removing-json-object-from-json-file */




/* fILE SYSTEM END*/
var app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/bookAPI', {
    useNewUrlParser: true
})
var port = 3000;

app.get('/', (req, res) => {
    res.send('I am great')
})


app.listen(port, () => {
    console.log('Running on port' + port)
})

app.use('/api', router)

module.exports = app