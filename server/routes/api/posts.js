//imports
    let express = require('express');
    let mongodb = require('mongodb');
    let nodemailer = require('nodemailer');
    let router = express.Router();
    //database
    let database = 'factuur';
    let connectionString = 'mongodb://localhost:27017/database'; //local
    //let connectionString = 'mongodb+srv://kaquoting:imawolf!@cluster.nq0hm.mongodb.net/cluster?retryWrites=true&w=majority'; //global

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
        let replace = {
            _id: req.body._id,
            password: req.body.password,
            added: req.body.added,
            privilege: req.body.privilege
        };
        await collection.replaceOne(query, replace, options);
        //return status
            res.status(201).send();
    });

//delete item
    router.delete('/:id', async(req, res) => {
        let posts = await loadCollection('users');
        posts.deleteOne({_id: req.params.id});
        res.status(200).send();
    });

//get invoice count
    router.post('/getInvoiceCount', async (req, res) => {
    //get collection
        let collection = await loadCollection('configs');
    //get config
        let result = {};
        let config = await collection.findOne({_id: 'master'});
        if(config && config.invoiceCount != null){
        //increment
            config.invoiceCount++;
        //update
            let filter = {_id: 'master'};
            let update = {
                $set: {invoiceCount: config.invoiceCount}
            };
            await collection.updateOne(filter, update);
        //bind
            result.invoiceCount = config.invoiceCount;           
        }
    //return data
        res.send(result);
    });

//get data
    router.post('/getData', async (req, res) => {
        //get collection
            let collection = await loadCollection('users');
        //get user
            let userId = req.body.userId;
            let user = await collection.findOne({_id: userId});
        //bind result
            let result = {};
            if(user){
                result.contact = user.contact || {}; 
                result.cards = user.cards || [];
            }
        //return data
            res.send(result);
        });

//save data
    router.post('/saveData', async (req, res) => {
    //get collection
        let collection = await loadCollection('users');
    //get params
        let cards = req.body.cards;
        let contact = req.body.contact;
        let update = {
            $set: { cards: cards, contact: contact }
        };
    //get filter
        let filter = { _id: req.body.userId };
    //run command
        await collection.updateOne(filter, update);
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