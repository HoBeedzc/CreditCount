'use strict';

class GetFileFromDB {
    static fetch(filePath) {
        return new Promise(function (resolve, reject) {
            fetch(filePath).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(data);
            }).catch(function (e) {
                reject(e);
                console.log("Oops, error");
            });
        });
    }
}

module.exports = {GetFileFromDB}