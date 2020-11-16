//imports
let express = require('express');
let mongodb = require('mongodb');
let router = express.Router();
let connectionString = 'mongodb://localhost:27017/database'; //local
//let connectionString = 'mongodb+srv://dizad87:danotron1@cluster-lpjoe.azure.mongodb.net/test?retryWrites=true&w=majority'; //global
let database = 'cluster';

//get items
router.get('/getItems', async (req, res) => {
    let posts = await loadCollection('items');
    res.send(await posts.find({}).toArray());
});

//save item
router.post('/saveItem', async (req, res) => {
//insert user
let posts = await loadCollection('items');
    await posts.insertOne({
        _id: req.body._id,
        date: req.body.date,
        tasks: req.body.tasks
    });
//return status
    res.status(201).send();
});

//delete item
router.delete('/:id', async(req, res) => {
    let posts = await loadCollection('items');
    posts.deleteOne({_id: req.params.id});
    res.status(200).send();
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