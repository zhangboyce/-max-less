'use strict';
const bcrypt = require('bcryptjs');

(async function() {
    const hash = await bcrypt.hash('admin', 10);
    console.log(hash);
})();
