module.exports = {
    confirmUrl: (url) => {
        let regEx = /^https?:\/\/(\S+\.)?(\S+\.)(\S+)\S*/;
        return regEx.test(url);
    },

    checkId: (id) => {
        return !isNaN(id);
    },
}