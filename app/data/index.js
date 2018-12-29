/**
 * Created by Boyce on 18/8/24.
 */
var arguments = process.argv.splice(2);
if (!arguments || arguments.length == 0) {
    console.warn('> please specify data type. ');
    return;
} else {
    console.log('> will be init data: %s', arguments);
}
let types = [].slice.call(arguments);

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/max_less');

var db = mongoose.connection;
db.once('open', async () => {
    for (let it of types) {
        try {
            let type = require('./' + it);
            await type(mongoose);
        } catch(e) {
            console.warn('> no such file or file name error: %s. ', it, e);
        }
    }
    db.close();
});