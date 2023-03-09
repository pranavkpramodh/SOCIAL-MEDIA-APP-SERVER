const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SocialMedia', {

    
})

const User = mongoose.model('User', {
    num: Number,
    fullName: String,
    uname: String,
    pswd: String,
    isLogged:Boolean,
    bday:Object,
    bio:String,
    profileUrl:String,
    description:String,
    followerscount:Number,
    followingcount:Number,
    likes:[],
    likescount:Number,
    posts:[],
    follwers:[],
    following:[],
    messages:{},
    notifications:[]
})

const Post = mongoose.model('Post', {
    uname:String,
    postUrls:[],
    caption:String,
    likes:[],
    likescount:Number,
    comments:[]

})





module.exports = {
    User,
    Post,
}

