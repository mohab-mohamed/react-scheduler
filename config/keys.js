if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    console.log("IN DEV");
    module.exports = require('./dev');
}