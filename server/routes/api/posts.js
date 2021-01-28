//imports
    let express = require('express');
    let mongodb = require('mongodb');
    let router = express.Router();
//database
    let database = 'factuur';
    //let connectionString = 'mongodb://localhost:27017/database'; //local
    //let connectionString = 'mongodb+srv://kaquoting:imawolf!@cluster.nq0hm.mongodb.net/cluster?retryWrites=true&w=majority'; //global
    let connectionString = 'mongodb+srv://factuur:missComplain!@cluster.svt03.mongodb.net/factuur?retryWrites=true&w=majority'; //internet

//get token
    router.post('/getToken', async (req, res) => {
    //build JSON
        let result = {
            validUsername : false,
            validPassword: false,
            privilege: false
        };
    //get collection
        let collection = await loadCollection('users');
    //query
        let user = await collection.findOne({
            _id: req.body.username});
        if(user){
            result.validUsername = true;
            if(user.password == req.body.password){
                result.validPassword = true;
                result.privilege = user.privilege;
            }
        }
    //return
        res.send(result);
    });

//get users
    router.get('/getUsers', async (req, res) => {
    //get collection
        let collection = await loadCollection('users');
    //query
        res.send(await collection.find({}).toArray());
    });

//save user
    router.post('/updateUser', async (req, res) => {
    //build JSON
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
    //return
        res.status(201).send();
    });

//delete user
    router.delete('/:id', async(req, res) => {
    //get collection
        let posts = await loadCollection('users');
    //query
        posts.deleteOne({_id: req.params.id});
    //return
        res.status(200).send();
    });

//get data
    router.post('/getData', async (req, res) => {
        //get collection
            let collection = await loadCollection('users');
        //query
            let userId = req.body.userId;
            let user = await collection.findOne({_id: userId});
        //get result
            let result = {};
            if(user){
                result.contact = user.contact || {}; 
                result.cards = user.cards || [];
            }
        //return
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
    //query
        await collection.updateOne(filter, update);
    //return
        res.status(201).send();
    });

//get invoice count
    router.post('/getInvoiceCount', async (req, res) => {
    //get collection
        let collection = await loadCollection('configs');
    //get params
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
    //return
        res.send(result);
    });

//get taunt count
    router.post('/getTauntCount', async (req, res) => {
    //get collection
        let collection = await loadCollection('configs');
    //get result
        let result = {};
        let config = await collection.findOne({_id: 'master'});
        if(config && config.tauntCount != null){
        //increment
            config.tauntCount++;
            let max = 27; //number of total taunts
            if(config.tauntCount == max){
                config.tauntCount = 0;
            }
        //update
            let filter = {_id: 'master'};
            let update = {
                $set: {tauntCount: config.tauntCount}
            };
            await collection.updateOne(filter, update);
        //bind
            result.tauntCount = config.tauntCount;           
        }
    //return
        res.send(result);
    });

//get mute option
    router.post('/getMute', async (req, res) => {
        //get collection
            let collection = await loadCollection('configs');
        //query
            let config = await collection.findOne({_id: 'master'});
        //return
            res.send(config.isMute);
    });

//set mute option
    router.post('/setMute', async (req, res) => {
        //get collection
            let collection = await loadCollection('configs');
        //get params
            let filter = {_id: 'master'};
            let update = {
                $set: {isMute: req.body.isMute}
            };
        //query
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