const fs=require('fs')
const Photo = require('../models/Photo')

exports.uploadPhoto=async (req, res) => { 
    const uploadDir='public/uploads'
    if(!fs.existsSync(uploadDir)){
       fs.mkdirSync(uploadDir)
    }
 
    let uploadImage=req.files.image
    let uploadPath=__dirname + '/../public/uploads/' + uploadImage.name
    
    uploadImage.mv(uploadPath, async ()=>{
       await Photo.create({
          ...req.body,
          image: '/uploads/' + uploadImage.name
       })
       res.redirect('/')
    })
   
 }

 exports.deletePhoto=async (req,res)=>{
    const photo= await Photo.findOne({_id:req.params.id})
    let deletedPhoto=__dirname + '/../public'+ photo.image
    fs.unlinkSync(deletedPhoto)
    await Photo.findByIdAndDelete(req.params.id)
    res.redirect('/')
  }

  exports.updatePhoto=async (req,res)=>{
    const photo=await Photo.findOne({_id: req.params.id})
    photo.title=req.body.title
    photo.description=req.body.description
    photo.save()
    res.render("edit",{
       photo
    })
   /*  res.redirect(`/photos/${req.params.id}' */
   console.log(req.body)
 }