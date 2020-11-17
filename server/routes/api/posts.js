//imports
let express = require('express');
let mongodb = require('mongodb');
let router = express.Router();
let database = 'cluster';
let connectionString = 'mongodb://localhost:27017/database'; //local
//let connectionString = 'mongodb+srv://dizad87:danotron1@cluster-lpjoe.azure.mongodb.net/test?retryWrites=true&w=majority'; //global

//check token
router.post('/getToken', async (req, res) => {
    let result = {
        validUsername : false,
        validPassword: false,
        privilege: false
    };
    //req.body.password == 'admin';
    //req.body.username == 'imawolf!';

    let collection = await loadCollection('users');
    let user = await collection.findOne({
        _id: req.body.username});
    if(user){
        result.validUsername = true;
        if(user.password == req.body.password){
            result.validPassword = true;
            if(user.privilege == 'admin'){
                privilege = user.privilege;
            }
        }
    }
    res.send(rresulteq);
});












//get items
router.get('/getUsers', async (req, res) => {
    let posts = await loadCollection('users');
    res.send(await posts.find({}).toArray());
});



//save item
router.post('/saveItem', async (req, res) => {
//insert user
let posts = await loadCollection('users');
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
    let posts = await loadCollection('users');
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