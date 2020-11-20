//imports
    let express = require('express');
    let mongodb = require('mongodb');
    let nodemailer = require('nodemailer');
    let router = express.Router();

    //database
    let database = 'cluster';
    //let connectionString = 'mongodb://localhost:27017/database'; //local
    let connectionString = 'mongodb+srv://kaquoting:imawolf!@cluster.nq0hm.mongodb.net/cluster?retryWrites=true&w=majority'; //global

//get token
    router.post('/getToken', async (req, res) => {
        let result = {
            validUsername : false,
            validPassword: false,
            privilege: false
        };
        let collection = await loadCollection('users');
        let user = await collection.findOne({
            _id: req.body.username});
        if(user){
            result.validUsername = true;
            if(user.password == req.body.password){
                result.validPassword = true;
                result.privilege = user.privilege;
            }
        }
        res.send(result);
    });
//get users
    router.get('/getUsers', async (req, res) => {
        let collection = await loadCollection('users');
        res.send(await collection.find({}).toArray());
    });

//save item
    router.post('/updateUser', async (req, res) => {
        //build params
        let collection = await loadCollection('users');
        let query = { _id: req.body._id };
        let options = { //insert if doesn't exist
        upsert: true,
        };
        //build document
        let replacement = {
            _id: req.body._id,
            password: req.body.password,
            added: req.body.added,
            privilege: req.body.privilege
        };
        let result = await collection.replaceOne(query, replacement, options);
        //return status
            res.status(201).send();
    });

//delete item
    router.delete('/:id', async(req, res) => {
        let posts = await loadCollection('users');
        posts.deleteOne({_id: req.params.id});
        res.status(200).send();
    });

//send email
    router.post('/sendEmail', async (req, res) => {
    //build transporter
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'service.oswald@gmail.com',
            pass: 'serviceoswald1234!'
          }
        });
    //build email
        var mailOptions = {
          from: 'service.oswald@gmail.com',
          to: 'kaquoting@gmail.com',
          subject: req.body.subject,
          html: req.body.html
        };
    //send email
        transporter.sendMail(mailOptions, function(error){
          if (error) {
            console.log(error);
          }
        });
    //return status
        res.status(201).send();
    });

//database
    async function loadCollection(collection){
        let client = await mongodb.MongoClient.connect(connectionString, {
            useNewUrlParser: true
        });
        return client.db(database).collection(collection);
    }

//export
    module.exports = router;