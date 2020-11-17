//import
    import axios from 'axios';
    let url = 'api/posts/';

//class
class bridge {
//check user
//get items
static getToken(user){
    return new Promise(async (resolve, reject) => {
        try{
            let command = 'getToken';
            let res = await axios.get(url + command);
            resolve(res.data);
        } catch(err){
            reject(err);
        }
    });
}













//get items
    static getUsers(){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getUsers';
                let res = await axios.get(url + command);
                let data = res.data;
                resolve(data);
            } catch(err){
                reject(err);
            }
        });
    }

//save item
    static saveItem(item){
        try{
            let command = 'saveItem';
            return axios.post(url + command, item
            );
        } catch(err){
            reject(err);
        }
    }

//delete item
    static deleteItem(id){
        return axios.delete(`${url}${id}`);
    }
}

//export
export default bridge;