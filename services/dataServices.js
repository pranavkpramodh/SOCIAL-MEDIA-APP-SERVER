const db = require('./db');
const jwt = require('jsonwebtoken')


const register = (num, fullName, uname, pswd, bday) => {
    return db.User.findOne({uname})
    .then( user =>{
        if(user){
            return{ 
                status:'false',
                statusCode:400,
                message:"User already Registered"

            }
        }
        else{
            const newUser = new db.User({
                num,
                fullName,
                uname,
                pswd,
                isLogged:false,
                followerscount:0,
                followingcount:0,
                likescount:0,
                likes:[],
                bday:{
                    uname:uname,
                    bday:bday
                }
            })
            newUser.save();
            return{
                status:'true',
                statusCode:200,
                message: fullName + " Registered Successfull",
                currentUname:uname,
            }
        }
    })
}


const login = (uname, pswd) => {
    return db.User.findOne({uname, pswd})
    .then(user => {
        if(user){
            const token = jwt.sign({ uname:uname }, 'loginkey')
            // console.log(token);

            currentUser = user.fullName;
            currentUsername = uname;
            user.isLogged = true;
            user.save();

            return{
                status:'true',
                statusCode: 200,
                message: 'Welcome ' + currentUser,
                currentUser:currentUser,
                currentUsername:currentUsername,
                token:token
            }
        }else{
            return{
                status:'false',
                statusCode: 400,
                message: 'Invalid user Details',
            }
        }

    })

}

const getUsersList = () =>{
    return db.User.find().then(users => {
        if(users){
            return{
                status:true,
                statusCode:200,
                userlist:users,
                message:"all users list"
            }
        }else{
            return{
                status:false,
                statusCode:400,
                // userlist:[]
                message:'no user'
            }
        }
    })
}


const suggetions = (loginedUser) => {
    return db.User.findOne({uname:loginedUser}).then(user => {
        console.log(loginedUser);
        if(user){
            return{
                status:true,
                statusCode:200,
                loginedUser:user
            }

        }else{
            return{
                    status:false,
                    statusCode:400,
                    message:"error"
            }
        }
    })

    
}



const logout = (currentUsername) => {
    return db.User.findOne({uname:currentUsername}).then(user => {
        if(user){

            user.isLogged = false;
            user.save();

            return{
                status:true,
                statusCode:200,
                message: currentUsername + " logged out successfully"
            }
        }else{
            return{
                status:false,
                statusCode:400,
                message:"logout function is not working"
            }
         
        }
    })


}


const otherprofile = (uname) => {
    console.log(uname);
    return db.User.findOne({uname}).then(user =>{
        if(user){

            return{
                status:true,
                statusCode:200,
                otheruser:user
            }
        }else{
            return{
                status:false,
                statusCode:400,
                message:'user not found',
                // otheruser:user
            }
        }
    })
}

let arr = [];

const followingUser = (loginedUser, otheruser) => {
    console.log(loginedUser);
    return db.User.findOne({uname:loginedUser}).then(user=>{
        if(user){
            if(!user.following.includes(otheruser)){

            console.log(user);
            user.following.push(otheruser)

            if(loginedUser != otheruser){
                user.followingcount+=1
                user.save()
            }

            return{
                status:true,
                statusCode:200,
                otheruser:user,
                following:user.followingcount,

            }

        }else{

            loginedUserindex = user.following.indexOf(otheruser);
        // //    console.log(loginedUserindex);
           user.following.splice(loginedUserindex, 1);
           if(loginedUser != otheruser){
               user.followingcount-=1
               user.save()
           }




            return{
                status:false,
                statusCode:400,
                message:'user not found',
            }
        }

}})

}

// follow
const follow = (loginedUser, otheruser) => {
    console.log(loginedUser);
    return db.User.findOne({uname:otheruser}).then(user=>{
        if(user){
            if(!user.follwers.includes(loginedUser)){
                // console.log(!user.follwers.includes(loginedUser));
                user.follwers.push(loginedUser) 
              
                // user.save();
                if(loginedUser != otheruser){
                    user.followerscount+=1
                    user.save()
                }
            return{
                status:true,
                statusCode:200,
                message:loginedUser + " Followed " + otheruser,
                total:user.followerscount,
                user:user,
                following:"following"
            }
        }else{
           loginedUserindex = user.follwers.indexOf(loginedUser);
        //    console.log(loginedUserindex);
           user.follwers.splice(loginedUserindex, 1);
           if(loginedUser != otheruser){
               user.followerscount-=1
               user.save()
           }

           
           return{
                status:false,
                statusCode:400,
                message:loginedUser + " removed " + otheruser,
                total:user.followerscount,
                user:user,
                follow:"follow"

           }
        }
    }
    })

}





const getMyProfile = (loginedUser) =>{
    return db.User.findOne ({uname:loginedUser}).then(user => {
        if(user){

            return{
                status:true,
                statusCode:200,
                myDetails:user
            }
        }else{
            return{
                status:false,
                statusCode:400,
                message:"Some Error Occured"
            }
        }
    
    }
    )
}

const searchedProfile = (uname) => {
    return db.User.findOne({uname}).then(user =>{
        if(user){
            return{
                status:true,
                statusCode:200,
                details:user
            }
        }else{
            return{
                status:false,
                statusCode:400,
                message:"Some Error Occured"
            }
        }
    })
}

    

    const like = (loginedUser, uname) => {
        console.log(uname);
        return db.User.findOne({uname}).then(user => {
            if(user){

                
            console.log(user.likes.includes(loginedUser) ,"hhh");

            if(!user.likes.includes(loginedUser)){

           
                // if(allowLike === true){   
                console.log(user.likes);
                user.likes.push(loginedUser);
                user.likescount+=1;
                allowLike = false;
                user.save();

                return{
                    status:true,
                    statusCode:200,
                    message:"liked",
                    data:user
                }

            }else{
                loginedUseri = user.likes.indexOf(loginedUser);
                   console.log(loginedUseri);
                   console.log(user);
                   user.likes.splice(loginedUseri, 1);
                   user.likescount-=1;
                   user.save();
                   allowLike = true;
                return{
                    status:false,
                    statusCode:400,
                    message:"unliked",
                    style:"liked",
                    data:user

                }
            }
            }else{
                return{
                    status:false,
                    statusCode:400,
                    message:"error occured",
                }
            }
        })

    }

    const getNotification = (uname) => {
        return db.User.findOne({uname}).then(user =>{
            if(user){
                console.log(user);

                return{
                    status:true,
                    statusCode:200,
                    notification:user.follwers,


                }
            }else{
                return{
                    status:false,
                    statusCode:400,
                    notification:"error occured"
                }
            }

        })


    }


    const preview = (loginedUser, desp, img) => {
        console.log(img);
        return db.User.findOne({uname:loginedUser}).then(user => {
            if(user){

                const newPost = new db.Post({
                    uname:user.uname,
                    postUrls:img,
                    caption:desp,
                    likes:[],
                    likescount:0,
                    comments:[],


                })
                
                newPost.save();
                user.posts.push(img)
                user.save();

                return{
                    status:true,
                    statusCode:200,
                    user:user,
                    message:"posted successfully"
                }

            }else{
                return{
                    status:false,
                    statusCode:400,
                    message:"error occured"
                }
            }
        })

    }


    // const preview = (loginedUser, desp, img) => {
    //     console.log(img);
    //     return db.Post.findOne({uname:loginedUser}).then(user => {
    //         if(user){

    //             console.log(user);
    //             user.postUrls.push(img)
    //             user.caption=desp
    //             user.save();

    //             return{
    //                 status:true,
    //                 statusCode:200,
    //                 user:user,
    //                 message:"posted successfully"
    //             }
               

    //         }else{

    //          const newPost = new db.Post({
    //             uname:loginedUser,
    //             postUrls:img,
    //             caption:desp,
    //             likes:[],
    //             likescount:0,
    //             comments:[],


    //         })
    //         newPost.save();

    //         return{
    //             status:true,
    //             statusCode:200,
    //             user:user,
    //             message:"posted successfully"
    //         }
    // }})

    // }


    const showpost = () => {
        return db.Post.find().then(user => {
            if(user){
                return{
                    status:true,
                    statusCode:200,
                    posts:user,
                    message:"hd"
                }

            }else{
                return{
                    status:false,
                    statusCode:400,
                    message:"error occured"

                }
            }
        })
    }


    const updateuser = (  loginedUser,num, uname, fullName  ) =>{
        return db.User.findOne({uname:loginedUser}).then(user => {
            if(user){
                 console.log(user);
                 user.uname = uname;
                 user.num = num;
                 user.fullName = fullName;

                 user.save();

                 return{
                    status:true,
                    statusCode:200,
                    posts:user,
                    message:"Profile Updated"
                }
            }else{
                return{
                    status:false,
                    statusCode:400,
                    message:"Error"
                }
            }
        })


    }


    const otherlikes = (otherusername) => {
        return db.User.findOne({uname:otherusername}).then(user => {
            if(user){
                return{
                    status:true,
                    statusCode:200,
                    user:user
                }
            }else{
                return{
                    status:false,
                    statusCode:400,
                    message:"error "
                }
            }
        })

    }

    const otherposts = (otherusername) =>{
        return db.User.findOne({uname:otherusername}).then(user => {
            if(user){
                return{
                    status:true,
                    statusCode:200,
                    user:user
                }
            }else{
                return{
                    status:false,
                    statusCode:400,
                    message:"error"
                }
            }
        })
    }





module.exports = { 
    register,
    login,
    getUsersList,
    suggetions,
    logout,
    otherprofile,
    follow,
    getMyProfile,
    searchedProfile,
    followingUser,
    like,
    getNotification,
    preview,
    showpost,
    updateuser,
    otherlikes,
    otherposts

}