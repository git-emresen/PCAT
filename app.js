const express = require('express')
const fs=require('fs')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride=require('method-override')
const path = require('path')
const ejs = require('ejs')
const Photo = require('./models/Photo')
const photoController=require('./controllers/photoController')
const pageController=require('./controllers/pageController')


const app = express()

mongoose.connect('mongodb+srv://siyahand:Zk30jWL5sbI2lmIo@pcat-app.7jfltch.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
   console.log(`port number has been set as ${port}`)
  })
.catch((err)=>{
   console.log(err)
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.set("view engine", "ejs")
app.use(methodOverride('_method',{
   methods:['POST','GET']
}))

app.get('/', pageController.getIndexPage)

app.get('/about', pageController.getAddPage)

app.get('/add', pageController.getAddPage)

app.get('/photos/:id', pageController.getOnePhotoPage)

app.get('/photos/edit/:id',pageController.getEditPage)

app.put('/photos/:id', photoController.updatePhoto)

app.delete('/photos/:id', photoController.deletePhoto)

app.post('/photos', photoController.uploadPhoto)

const port=process.env.PORT || 5000
app.listen(port, () => console.log("server başlatıldı.."))