module.exports = {
//get the session expiration date
    getExpiration: () => {
        let date = moment();
        return moment(date).add(20, 'm').toDate();
    }
}