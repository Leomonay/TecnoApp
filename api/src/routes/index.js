const {Router} = require('express');

const router = Router();

router.get('/',function(req,res){
    res.send('Tecnoclima Data Base');
});

module.exports = router;