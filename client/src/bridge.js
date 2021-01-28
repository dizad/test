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

//get invoice count
    static getInvoiceCount(){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getInvoiceCount';
                let res = await axios.post(url + command);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }

//get taunt count
    static getTauntCount(){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getTauntCount';
                let res = await axios.post(url + command);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }

 //get mute option
    static getMute(){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getMute';
                let res = await axios.post(url + command);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }

//set mute option
    static setMute(params){
        try{
            let command = 'setMute';
            return axios.post(url + command, params
            );
        } catch(err){
            reject(err);
        }
    }
}

//export
export default bridge;