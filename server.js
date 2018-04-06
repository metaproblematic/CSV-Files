const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const multer = require('multer')
const csv = require('csvtojson')

csv({noheader:false})
.fromString(csvStr)
.on('csv',(csvRow)=>{ 
    console.log(csvRow) 
})
.on('done',()=>{
    
})

app.use(express.static('./public'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(multer({dest: './uploads/'}))

app.use('/uploads', uploads)


//connecting to mongodb at port 27017
mongoose.connect('mongodb://localhost:27017/food', {useMongoClient: true})

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
})

// a schema that defines the properties of a valid csv document
// var csvSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     calories: {
//         type: Number,
//         required: true,
//     },
//     delicious: {
//         type: Boolean,
//         default: true
//     }
// })

// var CsvModel = mongoose.model('csv', csvSchema)

// app.get('/', function(req, res){
//     var newFood = new FoodModel({
//         name: 'Candy Corn',
//         calories: 50
//     })
//     newFood.save(function(err){

//         // there will be an error here if the object we tried to save does not match our schema
//         if (err) {res.send(err)}
//         else {
//             res.send("saved the file!")
//         }
//     })
// })


// app.get('/double-candy', function(req, res){

//     // data is an array of every food named 'Cotton Candy' (should only be one food named Cotton Candy)
//     FoodModel.find({name: 'Cotton Candy'}, function(err, data){
//         if (err) {console.log(err)}
//         data[0].calories = data[0].calories * 2
//         data[0].save(function(){
//             res.send(data[0])
//         })
//     })
// })

// app.get('/all-food', function(req, res){

//     // data is an array of every food object
//     FoodModel.find({}, function(err, data){
//         if (err){console.log(err)}
//         res.send(data)
//     })
// })


app.listen(8080, function(){
    console.log('server is running at port 8080')
})


