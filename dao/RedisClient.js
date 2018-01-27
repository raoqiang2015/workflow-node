// redis 链接
const redis   = require('redis');
const client  = redis.createClient('6379', '127.0.0.1');

// redis 链接错误
client.on("error", function(error) {
  console.log(error);
});

module.exports = {
  set : (key, value) => {
    if (typeof value == 'object'){
      client.set(key, JSON.stringify(value));
    } else {
      client.set(key, value);
    }
  },
  get : (key, callback) => client.get(key,(err, res) => {
    if (typeof res == 'string'){
      callback(JSON.parse(res));
    }else{
      callback(res);
    }
  }),
  increase: (key, callback, step) => {
    if (step && (typeof step == 'number')) {
      client.incrby(key, step, (err,res) => {
        callback(res);
      });
    } else {
      client.incr(key,(err,res) => {
        callback(res);
      })
    }
  }
}