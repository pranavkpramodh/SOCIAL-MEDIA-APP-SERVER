const express = require('express');
const cors = require('cors');
const dataServices = require('./services/dataServices');
// const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.use(cors({
    origin:[ 'http://localhost:4200','http://localhost:60546']
}))

 
// app.listen(3000, () => {
//     console.log('listening on port 3000');
// })
app.listen(3002, () => {
    console.log('listening on port 3002');
})


// // Application specific middlewre
// const appMiddleware = (req, res, next) => {
//     console.log("Application Specific middleware");
//     next();
// }

// app.use(appMiddleware)
// // router specific middleware
// const jwtMiddleware = (req, res, next) => {////router specific uses to do specific things
//     try{
//         console.log('router specific middleware');
//         const token = req.headers['x-access-token']
//         const data = jwt.verify(token,'loginkey')
//         console.log(data);
//         next();

//     }
//     catch{
//         res.status(422).json({
//             statusCode:422,
//             status:false,
//             message:'please login first'
//         })
//     }
// }



app.post('/register', (req, res) => {
    console.log(req.body);
    dataServices.register(req.body.num, req.body.fullName, req.body.uname, req.body.pswd, req.body.bday )
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    dataServices.login(req.body.uname, req.body.pswd).then(result => {
        res.status(result.statusCode).json(result)
    })

})

app.get('/home', (req, res) => {
    console.log(req.body);
    dataServices.getUsersList().then(result =>{
        res.status(result.statusCode).json(result)
    })
})


app.post('/suggetions', (req, res) => {
    dataServices.suggetions(req.body.loginedUser).then(result =>{
        res.status(result.statusCode).json(result)
    })
})




app.post('/logout', (req, res) => {
    dataServices.logout(req.body.currentUsername).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.post('/otherprofile', (req,res) => {
    dataServices.otherprofile(req.body.uname).then(result => {
        res.status(result.statusCode).json(result)

    })
})

app.post('/follow', (req, res) => {
    dataServices.follow(req.body.loginedUser, req.body.otheruser).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.post('/following', (req, res) => {
    dataServices.followingUser(req.body.loginedUser, req.body.otheruser).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/profile', (req, res) => {
    dataServices.getMyProfile(req.body.loginedUser).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.post('/search', (req, res) => {
    dataServices.searchedProfile(req.body.uname).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.post('/like', (req, res) => {
    dataServices.like(req.body.loginedUser, req.body.uname).then(result => {
        res.status(result.statusCode).json(result)
    })
})
app.post('/getNotification', (req, res) => {
    dataServices.getNotification(req.body.uname).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/addpost', (req, res) => {
    dataServices.preview(req.body.loginedUser, req.body.desp, req.body.img).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.get('/showpost', (req, res) => {
    dataServices.showpost().then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/updateuser', (req, res) => {
    dataServices.updateuser( req.body.loginedUser,req.body.num, req.body.uname, req.body.fullName).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.post('/otherlikes', (req, res) => {
    dataServices.otherlikes(req.body.otherusername).then(result => {
        res.status(result.statusCode).json(result)
    })
})
app.post('/otherposts', (req, res) => {
    dataServices.otherposts(req.body.otherusername).then(result => {
        res.status(result.statusCode).json(result)
    })
})


