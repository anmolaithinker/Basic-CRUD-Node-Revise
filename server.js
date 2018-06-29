
let express = require('express')
let bp=require('body-parser');

// Lets Take our Model
let trialSchema = require('./trialScheme.js')
let app = express()


app.use(bp.urlencoded({extended:true}))
app.use(bp.json());


//////////////////////////// ALL OPERATIONS //////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////

// Create Operation

///////////////////////////////////////////////////////////////////////////////////////


// Creating user
app.post('/create' , (req,res)=>{

    let username = req.body.username
    let password = req.body.password

    console.log('Username : ' + username)
    console.log('Password : ' + password)

    // Checking for username is undefined or empty string
    if (username === undefined || password === undefined){
        res.send({res : 'error' , desc : 'Please specify username or password'})
    }
    else if (username === '' || password === ''){
        res.send({res : 'error' , desc: 'Please specify username or password'})
    }

    else{

        // res.send(username)
        // Add the username and password into the collection
        // We can encrypt the password but dont encrypt it

        let newUser = trialSchema({
            username: username,
            password : password
        })

        newUser.save((err)=>{
            if (err) throw err
            console.log('User Created!!!!!')
            res.send({res:'ok'})
        })
    }
});




///////////////////////////////////////////////////////////////////////////////////////////

// Read Operation

///////////////////////////////////////////////////////////////////////////////////////////


// getting all users
app.get('/findall',(req,res)=>{

    trialSchema.find({} , (err , users)=>{
        if (err) throw err
        console.log(users)
        res.send({res:'ok' , users : users})
    })

});


// getting user by username
app.get('/find',(req,res)=>{

    let username = req.query.username
    console.log('Inside Find username : ' + username)
    trialSchema.find({username : username} , (err , users)=>{
        if (err) throw err
        console.log(users)
        res.send({res:'ok' , users : users})
    })
});




/////////////////////////////////////////////////////////////////////////////////////////

// Delete Operation

/////////////////////////////////////////////////////////////////////////////////////////


app.post('/delete' , (req,res)=>{

    // Getting the username to delete
    let username = req.body.username

    trialSchema.find({username:username} , (err,user)=>{

        if (err) throw err

        // delete the user
        user.remove((err)=>{
            if (err) throw err
            console.log('---------------------------------------------------------')
            console.log('User Deleted Success')
            console.log('---------------------------------------------------------')
            res.send({res:'ok'})
        })
    })
})





///////////////////////////////////////////////////////////////////////////////////////////

// Update

///////////////////////////////////////////////////////////////////////////////////////////


app.post('/Update' , (req,res)=>{

    // Old
    let oldUsername = req.body.oldUsername

    // New
    let newUsername = req.body.newUsername

    trialSchema.findOneAndUpdate({username : oldUsername} , {username : newUsername} ,(err,user)=>{
        if (err) throw err
        res.send({res : 'ok' , user : user})
    })

})




// Port 3000 Listening
app.listen(3000 , ()=>{
    console.log('Server Started')
});
