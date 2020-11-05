const express=require('express');
const { body, validationResult } = require("express-validator/check");
const db = require("../connection/db");

const router=express.Router();

router.post("/",  [
    body("title", "Title length between 3 to 10")
      .isString()
      .isLength({ min: 3 })
      .isLength({ max: 10 })
      .notEmpty(),
    body("ISBN").isString().isLength({ min: 6 }),
    body("stock").isInt({ gt: -1 }),
    body("author").isString(),
  ],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }

    const {title,ISBN,stock,author}=req.body;
    let sql="INSERT INTO Book SET ?";
    db.query(sql,req.body,function(err,rows){
        if(err){
            res.status(400).json(err);
        }
        else{
            res.json(rows);
        }
    }) 
  })

  router.get("/",(req,res)=>{
    let sql="select *from Book";
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
    let sql="delete from Book where book_id=?";
    db.query(sql,id,(err,result)=>{
      if(err)
      {
        res.json(err);
      }
      else{
        res.json("Successfully deleted");
      }
    })

  })


  router.get("/search?",(req,res)=>{
   let title=req.query.title;
    //console.log(t);
    let sql=`select *from Book where title like '${title}%'`;
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


  
  module.exports=router;