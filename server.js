const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const multer = require('multer')
const csv = require('csvtojson')

var app = express()


app.use(express.static('./public'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

// app.use(multer({dest: './uploads/'}))

// app.use('/uploads', uploads)


//connecting to mongodb at port 27017
mongoose.connect('mongodb://localhost:27017/csv')

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
})

var fileSchema = new mongoose.Schema({
	productCode: {
	type: String, 
	},
	speed: {
		type: Number,
	}, 
	serviceType: {
		type: Array, 
	},
	streetAddress: {
		type: String, 
	}, 
	city: {
		type: String, 
	},
	postalCode: {
		type: String, 
	},
	country: {
		type: String, 
	},
	latitude: {
		type: Number, 
	},
	longitude: {
		type: Number, 
	},
	empty: {
		type: Boolean,
	},
})


var fileModel = mongoose.model('file', fileSchema)

fileSchema.pre('save', function(next) {
  console.log(!!this.serviceType.length)
  if (!this.productCode || !this.speed || !!this.serviceType.length) {
  	this.update({},{ $set: { empty: true } })
  } console.log(this)
  next()
})

app.get('/files', function(req, res) {
	fileModel.find({}, function(err, files) {
		if (err) {console.error(err)}
		res.send(files)
	})

})

app.post('/newFile', function(req, res) {
	console.log(req.body)
	const headers = ['productCode', 'speed', 'serviceType', 'streetAddress', 'city', 'postalCode', 'country', 'latitude', 'longitude', 'empty']
	csv({noheader:true, headers: headers})
		.fromString(req.body.newFileKey)
		.on('json',(json)=>{ 
		   console.log(json, "cablarb") 
			var newFile = new fileModel(json)
			newFile.save(function(err) {
			if (err) {console.error(err)}
				console.log('done')

			})
		})
		.on('done',()=>{
		res.send('success')    
	})
})

app.listen(8080, function(){
    console.log('server is running at port 8080')
})


