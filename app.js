const express = require('express')
const fs=require('fs')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
const ejs = require('ejs')
const Photo = require('./models/Photo')


const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.set("view engine", "ejs")

app.get('/', async (req, res) => {
   const photos = await Photo.find({}).sort('-dateCreated')
   res.render("index", {
      photos
   })
})

app.get('/about', (req, res) => {
   res.render('about')
})

app.get('/add', (req, res) => {
   res.render('add-photo')
})

app.get('/photos/:id', async (req, res) => {
   const photo = await Photo.findById(req.params.id)
   res.render("photo", {
      photo
   })
})

app.post('/photos', async (req, res) => { 
   const uploadDir='public/uploads'
   if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir)
   }

   let uploadImage=req.files.image
   let uploadPath=__dirname + '/public/uploads/' + uploadImage.name
   
   uploadImage.mv(uploadPath, async ()=>{
      await Photo.create({
         ...req.body,
         image: '/uploads/' + uploadImage.name
      })
      res.redirect('/')
   })
  
})


app.listen(3000, () => console.log("server başlatıldı.."))