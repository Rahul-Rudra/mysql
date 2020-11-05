const express=require('express');
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../connection/db");
//const mysql=require('mysql');
const router=express.Router();

 router.post("/", [
    check("name", "please include name and must be 3 charachter").not().isEmpty().isLength({ min: 3 }),
    check("email", "please mention a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
    
        const {name,email,role}=req.body;
        const post={name,email,password:hashed,role};
        let sql="INSERT INTO User SET ?";
        db.query(sql,post,function(err,rows){
            if(err){
                res.status(400).json(err);
            }
            else{
          jwt.sign(req.body, process.env.SECRET_KEY, (err, token) => {
            if (err) throw err;
            res.json({ token });
          });
            }})
    } catch (error) {
        res.status(500);
    }
   

  })

  router.get("/",(req,res)=>{
    let sql="select *from User";
    db.query(sql,(err,result)=>{
      if(err)
      {
        res.json(err);
      }
      else{
        res.json(result);
      }
    })
  })


  router.delete("/:id",(req,res)=>{
    let id=req.params.id;
    let sql="delete from User where id=?"
    db.query(sql,id,(err,result)=>{
      if(err)
      {
        res.json(err);
      }
      else{
        res.json("successfully deleted");
      }
    })
  })

  router.get("/:id",(req,res)=>{
    let id=req.params.id;
    let sql="select *from User where id=?";
    db.query(sql,id,(err,result)=>{
      if(err)
      {
        return res.json(err);
      }
      else{
        name=result[0].name;
        email=result[0].email;
        role=result[0].role;
        return res.json({name,email,role});
      }
    })
  })

  router.put("/:id",[check("name", "please include name and must be 3 charachter").not().isEmpty().isLength({ min: 3 }),
  check("email", "please mention a valid email").isEmail(),
 
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  } 
  
    const post={name,email,role}=req.body;
    let id=req.params.id;
    let sql="update User set name=? ,email=? ,role=? where id=? "
    db.query(sql,[name,email,role,id],(err,result)=>{
      if(err)
      {
        return res.json(err);
      }
      else{
        return res.json(result);
      }
    })
  })

router.get("/mybooks/:id",(req,res)=>{
  let user_id=req.params.id;
  
  let sql=`select Book.title,Issue.issueDate,Issue.returnDate from  Book left join Issue on Book.book_id=Issue.book_id where Issue.user_id=${user_id}`;
  db.query(sql,(err,result)=>{
    if(err)
    {
      return res.json(err);
    }
    else{
      return res.json(result);
    }
  })

})

  module.exports=router;