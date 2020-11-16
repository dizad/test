//import
    import axios from 'axios';
    let url = 'api/posts/';

//class
class bridge {
//get items
    static getItems(){
        return new Promise(async (resolve, reject) => {
            try{
                let command = 'getItems';
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