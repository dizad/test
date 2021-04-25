//imports
    let express = require('express');
    let mongodb = require('mongodb');
    let router = express.Router();
//database
    let database = 'dizagara';
    let connectionString = 'mongodb://localhost:27017/dizagara'; //local
    //let connectionString = 'mongodb+srv://dizagara:watermelonSaturdays1!@cluster.jmgxm.mongodb.net/dizagara?retryWrites=true&w=majority'; //internet

//get token
    router.post('/getToken', async (req, res) => {
    //build JSON
        let result = {
            validUsername : false,
            validFruit: false,
            privilege: false
        };
    //get collection
        let collection = await loadCollection('users');
    //query
        let user = await collection.findOne({
            _id: req.body.username
        });
        if(user){
            result.validUsername = true;
            if(user.fruit == req.body.fruit){
                result.validFruit = true;
                result.privilege = user.privilege;
            }
        }
    //return
        res.send(result);
    });

//get user
    router.post('/getUser', async (req, res) => {
    //get collection
        let collection = await loadCollection('users');
    //query
        let user = await collection.findOne({
            _id: req.body.id
        });
        if(user){
            delete user.fruit;
        }
    //return
        res.send(user);
    });

//licenses
    //get license count
        router.post('/getLicenseCount', async (req, res) => {
        //get collection
            let collection = await loadCollection('configs');
        //get params
            let result = {};
            let config = await collection.findOne({_id: 'master'});
            if(config && config.licenseCount != null){
                result.licenseCount = config.licenseCount;  
            }
        //return
            res.send(result);
        });

    //save license count
        router.post('/saveLicenseCount', async (req, res) => {
        //get collection
            let collection = await loadCollection('configs');
        //get params
            let licenseCount = req.body.licenseCount;
            let update = {
                $set: { licenseCount: licenseCount }
            };
        //get filter
            let filter = {_id: 'master'};
        //query
            await collection.updateOne(filter, update);
        //return
            res.status(201).send();
        });

    //set license
        router.post('/saveLicense', async (req, res) => {
        //get params
            let collection = await loadCollection('licenses');
            let query = { _id: req.body._id };
            let options = { //insert if doesn't exist
                upsert: true,
            };
        //build document
            let replace = req.body;
            await collection.replaceOne(query, replace, options);
        //return
            res.status(201).send();
        });

//get all licenses
    router.get('/getAllLicenses', async (req, res) => {
      //  let collection = await loadCollection('licenses');


        //get collection
        let collection = await loadCollection('configs');
        //get params
            let result = {};
            let config = await collection.findOne({_id: 'master'});
            if(config && config.licenseCount != null){
                result.licenseCount = config.licenseCount;  
            }
        //return
            res.send(result);


       // res.send(await collection.find({}).toArray());
    });

//get all licenses
    router.post('/getAllLicenses', async (req, res) => {
        let collection = await loadCollection('licenses');
        res.send(await collection.find({}).toArray());
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