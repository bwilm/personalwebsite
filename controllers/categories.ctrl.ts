import * as express from 'express';

import * as procedures from '../procedures/categories.proc';

var router = express.Router();

router.route('/')
    .get(function(req,res){
        procedures.all()
        .then(function(categories){
            res.send(categories);

        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        });
    });



export default router;