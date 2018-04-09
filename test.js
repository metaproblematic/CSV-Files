const csv = require('csvtojson')

csvStr = "1, 2, 3"

csv({noheader:false})
.fromString(csvStr)
.on('csv',(csvRow)=>{ 
    console.log(csvRow) 
})
.on('done',()=>{
    
})

