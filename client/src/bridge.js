//imports
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

//get user
    static getUser(id){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getUser';
                let res = await axios.post(url + command, id);
                resolve(res.data);
            } catch(err){
                reject(err);
            }
        });
    }

//licenses
    //get license count
        static getLicenseCount(){
            return new Promise(async (resolve, reject) => {
                try{
                    let command = 'getLicenseCount';
                    let res = await axios.post(url + command);
                    resolve(res.data);
                } catch(err){
                    reject(err);
                }
            });
        }

    //save license count
        static saveLicenseCount(params){
            try{
                let command = 'saveLicenseCount';
                return axios.post(url + command, params);
            } catch(err){
                reject(err);
            }
        }

    //save license
        static saveLicense(params){
            try{
                let command = 'saveLicense';
                return axios.post(url + command, params);
            } catch(err){
                reject(err);
            }
        }

    //get all licenses
        static getAllLicenses(){
            return new Promise(async (resolve, reject) => {
                try{
                    let command = 'getAllLicenses';
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