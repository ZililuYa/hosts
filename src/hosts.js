var fs = require('fs');
module.exports = function () {
    console.log(1);
    var path = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
    console.log(fs.statSync(path));
    if (fs.statSync(path)) {
        return path;
    }else{
        return false;
    }
};