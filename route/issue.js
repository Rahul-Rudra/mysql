const express=require("express");
const { now } = require("lodash");
const db=require("../connection/db");

const router=express.Router();

router.post("/book/:book_id/issue/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;
    const book_id=req.params.book_id;
    let sql1="select* from Book where book_id=?";
    db.query(sql1,book_id,(err,results)=>{
        if(err){
            res.json(err);
        }
        if(!results)
        {
            res.json("There are no book with this id");
        }
        if(results[0].stock>0)
        {
            const stock=results[0].stock-1;
           const issueDate=new Date();
          
            const myCurrentDate=new Date();
const myFutureDate=new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate()+ 8);
   
   const returnDate=myFutureDate;
            const post={user_id,book_id,issueDate,returnDate};
            let sql="insert into Issue set?"
            db.query(sql,post,(err,results)=>{
                if(err){
                    return res.json(err);
                }
                else{
                    //let issue_id=results.insertId;
            let sql2="update Book set stock=?, user_id=? where book_id=? ";
            db.query(sql2,[stock,user_id,book_id]);
            //console.log(results[0].id);
           // const post1={issue_id:results[0].issue_id,category:Issue}
          //  let sql3="insert into Activity set?";
           // db.query(sql3,post1);

                    res.json(results);
                }
            })
           
            
        }
        else{
            res.json("stock is Zero");
        }
       
    })
    
})

router.post("/return/book_id/:book_id/user_id/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;
    const book_id=req.params.book_id;
    let sql1="select* from Book where book_id=?";
    db.query(sql1,book_id,(err,results)=>{
        if(err){
            res.json(err);
        }
       
       else
        {
            const stock=results[0].stock+1;
           // const post={book_id};
            let sql=`delete from Issue where book_id=${book_id}`
            db.query(sql,(err,results)=>{
                if(err){
                    return res.json("something went wrong");
                }
                else{
                    
            let sql2="update Book set stock=?,user_id=? where book_id=? ";
            db.query(sql2,[stock,null,book_id]);

                    res.json(results);
                }
            })

            
        }
    
    })
    
})


router.post("/renew/book_id/:book_id/user_id/:user_id",async(req,res)=>{
    const user_id=req.params.user_id;
    const book_id=req.params.book_id;
    let sql1="select Issue.issueDate,Issue.returnDate from Book inner join Issue on Book.book_id=Issue.book_id";
    db.query(sql1,(err,results)=>{
        if(err){
            res.json(err);
        }
       if(!results)
       {
           return res.json({msg:"first Issue the book"}
           )
       }
       else 
        {
           // const stock=results[0].stock+1;
           // const post={book_id};
        // console.log(results)
         const currDate=new Date();
        // console.log(results[0].issueDate)
        // console.log(results[0].returnDate);
            if(currDate>results[0].returnDate)
            {
                const myCurrentDate=results[0].returnDate;
                const myFutureDate=new Date(myCurrentDate);
                    myFutureDate.setDate(myFutureDate.getDate()+ 8);
                   
                   const returnDate=myFutureDate;
                   //console.log(returnDate);
                let sql="update Issue set returnDate=?";
                db.query(sql,returnDate,(err,result)=>{
                    if(err)
                    {
                        return res.json(err);
                    }
                    else{
                        return res.json(result);
                    }
                })
            }
            else
            {
                return res.json({msg:"You can renew after the completion of return date"});
            }
          
          //  res.json(results[0].returnDate)
            
        }
    
    })
    
})



router.get("/",(req,res)=>{
    let sql="select * from Issue";
    db.query(sql,(err,results)=>{
        if(err)
        {
            res.status(500).json(err);
        }
        if(!results)
        {
            res.json("Empty");
        }
        else{
            res.json(results);
        }
    })
})

router.get("/issued/books",(req,res)=>{
    let sql="select Book.title,Issue.issueDate,Issue.user_id from Book Inner join Issue on Book.book_id=Issue.book_id";
    db.query(sql,(err,result)=>{
        if(err)
        {
            return res.json(err);
        }
        else
        {
            return res.json(result);
        }
    })
})
module.exports=router;