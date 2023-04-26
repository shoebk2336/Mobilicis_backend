

const express=require('express')
var bodyParser = require('body-parser')
const { connection } = require("./db")
const {Model}=require("./DB_model/Data.Model")
const cors=require('cors')

const app=express()

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}))
app.use(express.json())
app.use(cors())


app.get('/alldata',async(req,res)=>{
    const Data=await Model.aggregate([{$limit:50}])
    res.send(Data)
})

app.post('/postData',async(req,res)=>{

    req.body.forEach(async(el)=>{
        const Data=new Model(el)
        await Data.save()

    })
    
    
    res.send({msg:"Data posted",data:req.body})

})
app.get('/',(req,res)=>{
     res.send("welcome home")
})


app.get('/sort1',async(req,res)=>{

    const Data=await Model.find({$and:[
{
    income:{$lt:"5"}
},
{
    $or:[
        {car:"BMW"},
        {car:"Mercedes"}
    ]

}

    ]})
    res.send(Data)
})

app.get('/sort2',async(req,res)=>{
    const Data=await Model.find({$and:[

        {gender:"Male"},
        {phone_price:{$gte:10000}}
    ]})
    res.send(Data)
})

app.get('/sort4',async(req,res)=>{

    const Data=await Model.find(
{$or:[{car:"BMW"},{car:"Audi"},{car:"Mercedes"}]}
)

    const Filter=Data.filter((el)=>{


        let count=0
        for(i=0;i<el.email.length;i++){
            if(isNaN(el.email[i])===true){
                count++
            }
        }
        if(count===el.email.length){
            return (el)
        }
    })
    res.send(Filter)
    
})

// app.get('/sort5',async(req,res)=>{
//     const Data=await Model.find({})
// })


app.get('/sort5',async(req,res)=>{

    const Data= await Model.aggregate([{$group:{_id:"$city",count:{$sum:1},avg:{$avg:"$income"}}},{$sort:{count:-1}},{$limit:10}])
res.send(Data)

}
)
app.get('/sort3',async(req,res)=>{
    const Data=await Model.find({last_name:/^M/,$expr: { $gt: [ { $strLenCP: "$quote" }, 15 ] },email:{$regex:/M$/i}})
res.send(Data)

})




app.listen(8080,async()=>{
    await connection
    console.log('connected')
})