const Photo = require('../models/Photo')

exports.getIndexPage=async (req, res) => {

   const page=req.query.page || 1
   const photosPerPage=2

    const total= await Photo.find().countDocuments()
    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1) * photosPerPage)
    .limit(photosPerPage)

    res.render("index", {
       photos : photos,
       pages:Math.ceil(total/photosPerPage),
       current:page
    })
 }

 exports.getAboutPage= (req, res) => {
    res.render('about')
 }

 exports.getAddPage=(req, res) => {
    res.render('add-photo')
 }

 exports.getEditPage=async (req,res)=>{
    const photo=await Photo.findOne({_id: req.params.id})
    res.render("edit",{
       photo
    })
 }

 exports.getOnePhotoPage=async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render("photo", {
       photo
    })
 }