
var require_kipp = require('../lib/reqkipps');


var kipp={ '_id': '5833139e667331b149000011',
  'name': 'kipp001',
  'type': 'rest',
  'status': 'ready',
  'timestamp': '1479994169655',
  'ip': '127.0.0.1',
  'prot': '9999',
  'sid': '' }

var senddata={"name":"abd","sid":"kipp_1479390292082_47","type":"rest"}

require_kipp.runTask(kipp,senddata,function(err,body){

});