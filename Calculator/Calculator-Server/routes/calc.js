var express = require('express');
var router = express.Router();

router.post('/add', function(req,res,next){
  try{
    console.log(req.body.num1);
    var num1 = parseFloat(req.body.num1);
    var num2 = parseFloat(req.body.num2);
    var answer = 0;
    console.log(num1);

    if(isNaN(num1)){
      res.status(401).json({
          message: "Number 1 is Invalid."
      });
    }else if(isNaN(num2)){
      res.status(401).json({
          message: "Number 1 is Invalid."
      });
    }else{
      answer = num1 + num2;
      console.log(answer);
      console.log(`${num1} + ${num2} = ${answer}`);
    }
    res.status(201).json({
        message: `${num1} + ${num2} = ${answer}`
    })
  }catch(err){
    res.status(401).json({
        message: err.message
    });
  }
});

router.post('/sub', function(req,res,next){
    try{
        console.log(req.body.num1);
        var num1 = parseFloat(req.body.num1);
        var num2 = parseFloat(req.body.num2);
        var answer = 0;
        console.log(num1);

        if(isNaN(num1)){
            res.status(401).json({
                message: "Number 1 is Invalid."
            });
        }else if(isNaN(num2)){
            res.status(401).json({
                message: "Number 1 is Invalid."
            });
        }else{
            answer = num1 - num2;
        }
        res.send({
            message: `${num1} - ${num2} = ${answer}`,
            status: '201'
        })
    }catch(err){
        res.status(401).json({
            message: err.message
        });
    }
});

router.post('/mul', function(req,res,next){
    try{
        console.log(req.body.num1);
        var num1 = parseFloat(req.body.num1);
        var num2 = parseFloat(req.body.num2);
        var answer = 0;
        console.log(num1);

        if(isNaN(num1)){
            res.status(401).json({
                message: "Number 1 is Invalid."
            });
        }else if(isNaN(num2)){
            res.status(401).json({
                message: "Number 1 is Invalid."
            });
        }else{
            answer = num1 * num2;
        }
        console.log(answer);
        res.status(201).json({
            message: `${num1} * ${num2} = ${answer}`
        })
    }catch(err){
        res.status(401).json({
            message: err.message
        });
    }
});

router.post('/div', function(req,res,next){
    try{
        console.log(req.body.num1);
        var num1 = parseFloat(req.body.num1);
        var num2 = parseFloat(req.body.num2);
        var answer = 0;
        console.log(num1);

        if(isNaN(num1)){
            res.status(401).json({
                message: "Number 1 is Invalid."
            });
        }else if(isNaN(num2)){
            res.status(401).json({
                message: "Number 1 is Invalid."
            });
        }else if(num2 == 0) {
            res.status(401).json({
                message: "Number can not be divided by ZERO(0)."
            });
        }else{
            answer = num1 / num2;
        }
        res.status(201).json({
            message: `${num1} + ${num2} = ${answer}`
        })
    }catch(err){
        res.status(401).json({
            message: err.message
        });
    }
});

module.exports = router;
