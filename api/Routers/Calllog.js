const express = require('express');
const router = express.Router();

const calllogController = require('../Controller/Calllog');


router.get('/', calllogController.calllog_get_calllog);

router.post('/', calllogController.calllog_add_calllog);

router.delete('/:calllogId', calllogController.calllog_delete_calllog);

module.exports = router;