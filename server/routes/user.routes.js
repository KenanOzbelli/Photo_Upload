let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuid = require('uuid'),
    router = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req,file,cb) =>{
        const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
        cb(null, uuid.v4()+ '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null,true);
        }else{
            cb(null,false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

let User = require('../models/User');

router.post('/user-profile', upload.single('profileImg'), (req, res, next ) =>{
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename,
        date: Date.now()
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            error: err
        });
    })
})

router.get("/", (req, res, next) =>{
    User.find().sort({date:-1}).limit(1).then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users:data
        });
    });
});

module.exports = router;