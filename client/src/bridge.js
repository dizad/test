//import
    import axios from 'axios';
    let url = 'api/posts/';

//class
class bridge {
//get token
    static getToken(user){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getToken';
                let res = await axios.post(url + command, user);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }

//get users
    static getUsers(){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getUsers';
                let res = await axios.get(url + command);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }

//update or insert user
    static updateUser(user){
        try{
            let command = 'updateUser';
            return axios.post(url + command, user
            );
        } catch(err){
            reject(err);
        }
    }

//delete user
    static deleteUser(id){
        return axios.delete(`${url}${id}`);
    }

//send email
    static sendEmail(email){
        try{
            let command = 'sendEmail';
            return axios.post(url + command, email
            );
        } catch(err){
            reject(err);
        }
    }

//save user data
    static saveData(params){
        try{
            let command = 'saveData';
            return axios.post(url + command, params
            );
        } catch(err){
            reject(err);
        }
    }

//get user data
    static getData(params){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getData';
                let res = await axios.post(url + command, params);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }

//get quoteId
    static getQuoteCount(){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getQuoteCount';
                let res = await axios.post(url + command);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }
}

//export
export default bridge;