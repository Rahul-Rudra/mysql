const express=require('express');
const db=require('../connection/db');

const router=express.Router();

router.post("/book_id/:book_id/user_id/:user_id",(req,res)=>{
    let book_id=req.params.book_id;
    let user_id=req.params.user_id;
    let text="user has requested a book"
    let requested=true;
    const post={text,requested,user_id,book_id}

    let sql="insert into Message set?";
    db.query(sql,post,(err,result)=>{
        if(err)
        {
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })
})

router.get("/",(req,res)=>{
    let sql="select *from Message where allowed=? and rejected=?";
    db.query(sql,[0,0],(err,result)=>{
        if(err)
        {
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })
})

router.put("/:id",(req,res)=>{
    let allwoed=true;
    let sql="update Message set allowed=?";
    db.query(sql,allwoed,(err,result)=>{
        if(err)
        {
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })
})
//router.put("/",)
router.get("/allowed",(req,res)=>{
    let allowed=true;
    let rejected=false;
    let sql="select *from Message where allowed=? and rejected=?";
    db.query(sql,[allowed,rejected],(err,result)=>{
        if(err)
        {
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })
})


router.put("/reject/:id",(req,res)=>{
    let rejected=true;
    let sql="update Message set allowed=?";
    db.query(sql,rejected,(err,result)=>{
        if(err)
        {
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })
})

router.get("/rejected",(req,res)=>{
    let allowed=false;
    let rejected=true;
    let sql="select *from Message where allowed=? and rejected=?";
    db.query(sql,[allowed,rejected],(err,result)=>{
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