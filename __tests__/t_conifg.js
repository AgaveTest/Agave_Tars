var conf=require('../config.json');
test('test read config',()=>{
	expect (conf.host.ip).toBe('127.0.0.1');
	expect (conf.host.port).toBe('7988');
    expect (conf.mongoose.ip).toBe('127.0.0.1');
    expect (conf.mongoose.port).toBe('27017');
    expect (conf.mongoose.db).toBe('tars');

});
// config.log(conf.host.ip)