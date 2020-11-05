const express=require('express');
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../connection/db");
const router=express.Router();


router.post("/", [
    check("email", "please mention a valid email").isEmail(),
    check("password", "password is required").exists().isLength({ min: 6 }),
  ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }
    try {
      
        //const{email,password}=req.body;
        
    let sql="SELECT * FROM User WHERE email=?";
    db.query(sql,req.body.email,async(err,results)=>
    {
      
      
        if(err)
        {
            return res.json(err);
        }
      if(!results){
               return res.json("Invalid email or password");
           }
       
           const result=await bcrypt.compare(req.body.password,results[0].password);
       
         

    if(result){
        
           results[0].password=undefined;
           const id=results[0].id;
           const role=results[0].role;
           const name=results[0].name;
            jwt.sign({id},process.env.SECRET_KEY, (err, token) => {
                if (err) throw err;
               return res.json({token,id,name,role});
            })
          
       
          
        }
        else{
            res.status(400).json("password is Incorrect");
        }
       
    })
    } catch (error) {
        res.json(error);
    }
    
}
  );


module.exports=router;