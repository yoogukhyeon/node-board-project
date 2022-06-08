const express = require('express');
const router = express.Router();
const Couple = require('../models/couple')
const Search = require('../models/search')
const Calendar = require('../models/calendar')
const Place = require('../models/place')
const short = require('short-uuid');
const { db } = require('../models/couple');
const resResult = require('./common/resResult')
const shortid = require('shortid');
const schedule = require('node-schedule');
var HTMLParser = require('node-html-parser');

//list
router.get('/' , async(req, res) => {
        let {page , title} = req.query

      
    try{
        title = title ? title : ""

        const regex = (pattern) => new RegExp(`.*${pattern}.*`);
        const titleRegex = regex(title); 

        const totalCnt = await Couple.countDocuments({title: { $regex: titleRegex } });

        const maxPost = 5;
        const maxPage = 5;

        let currentPage = page ? Number(page) : 1;
            currentPage = page  <= 1 ? 1 : 1;
        let hidePost = page === 1 ? 0 : (page - 1) * maxPost; 
            hidePost = page <= 1 ? 0 : (page - 1) * maxPost; 
        let totalPage = Math.ceil(totalCnt / maxPost);
            totalPage = totalPage < 1 ? 1 : 1;


        if(currentPage > totalPage){
            currentPage = totalPage

            res.redirect(`/?page=${currentPage}`)
        }
        
        
      

        if(currentPage < 1){
            currentPage = 1

            res.redirect(`/?page=${currentPage}`)
        }
        
       

        const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1; 
        let endPage = startPage + maxPage - 1;
      
        if (endPage > totalPage) { 
          endPage = totalPage;
        }

        let searchData = await Search.find().sort({"_id" : -1}).limit(3)


        let listData = await Couple.find({title: { $regex: titleRegex } }).sort({"_id" : -1}).skip(hidePost).limit(maxPost)
        
        res.render('index' , {listData
            , startPage, 
              endPage, 
              hidePost, 
              maxPost, 
              totalPage, 
              currentPage,
              page,
              title,
              searchData
        })
    }catch(err){
        console.error("Error" , err)
    }
})



//insert
router.get('/insertPlan' ,async(req , res) => {
    res.render('insert')
})


router.post('/insertData' ,async(req , res) => {
    let slugId = short.generate(); 
    const {title , editordata} = req.body
    
    try{
        const result = await Couple.create({
            title : title,
            content : editordata,
            slug : slugId
        })

        
        let chk = true;
        do{
            if(result.slug === slugId){
                slugId = short.generate(); 
            
                const reDataResult = await Couple.findByIdAndUpdate(result._id ,{
                    slug : slugId
                })
            }
            chk = false
        }while(chk)

    
        res.send("<script>alert('계획을 저장했습니다.');location.href='/'</script>")
        res.end();

    }catch(err){
        console.error("Error" , err)
    }

   
})

//edit
router.get('/updatePlan/:slug' ,async(req , res) => {

    const { slug } = req.params
   
    try{
        const result = await Couple.findOne({
            slug : slug
        })

        res.render('update' , {result})
    }catch(err){
        console.error("Error" , err)
    }
});

router.post('/updateData' ,async(req , res) => {
    
    const { slug , title , editordata} = req.body;
    try{
        const result = await Couple.findOneAndUpdate({slug} , {
            title : title,
            content : editordata,
            snippet : editordata,
            createAt : new Date(),
        })

        res.send("<script>alert('계획을 수정했습니다.');location.href='/'</script>")
        res.end();
 
    }catch(err){
        console.error("Error" , err)
    }

   
})

//검색어 insert
router.post('/insertSearch', async(req , res) => {
    let result = 'success'
    let {keyword} = req.body;  


    try{
        
        const insertData = await Search.create({
            search : keyword,
        })

        
        result = 'success'
    }catch(err){
        console.log("Error" , err)
    }finally{
        res.send(result);
    }   
})




router.post('/test', async(req , res) => {
    let result = 'success' 
    const id = shortid.generate()
   

   
    try{
        
    


        result = 'success'
    }catch(err){
        console.log("Error" , err)
    }finally{
        res.send({
            id
        });
    }   
})


//calendar 
/* router.get('/calendar' , async(req , res) => {
    try{


        res.render('calendar/calendar')
    }catch(err){    
        console.log("Error " , err)
    }
}) */

//calendar list
router.get('/calendar' , async(req , res) => {
    try{
        let calendar = await Calendar.find()
        
        let newCalendar = [];
        let Obj = {}
        for(let i = 0; i < calendar.length; i++){
            Obj = new Object()
            Obj.title = calendar[i].title;
            Obj.start = calendar[i].start;
            Obj.end = calendar[i].start;
            Obj.url = `/calendar/${calendar[i].id}`

            newCalendar.push(Obj)
        }
        
        const data = JSON.stringify(newCalendar)

        res.render('calendar/calen' , { data})
    }catch(err){    
        console.log("Error " , err)
    }
})


//calendar update
router.get('/calendar/:id' , async(req , res) => {
        const {id} = req.params
    try{
        const findData = await Calendar.findOne({id});

        res.render('calendar/updateCalendar' , {findData})
    }catch(err){    
        console.log("Error " , err)
    }
})




//specialContent insert post data
router.post('/calendar/insertData', async (req, res, next) =>{
    let result = new Object();
        const {subject , place , date , desc} = req.body

        let id = shortid.generate() 

       
    try{
        
        const insertData = await Calendar.create({
            title : subject,
            place : place,
            start : date,
            desc : desc,
            id : id,
        })
        
        let chk = true
        while(chk){
            if(insertData.id === id){
                id = shortid.generate()
            
                const reDataResult = await Calendar.findByIdAndUpdate(insertData._id ,{
                    id : id
                })
               
            }
            chk = false
        }
      

    
        result = resResult(true, 200, "데이터 전송 완료", '');
    }catch(e){
        console.log(e);
        result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
    }finally{
        res.send(result);
    }   
});


//calendar update
router.post('/calendar/updateData', async (req, res, next) =>{
    let result = new Object();
        const {id , subject , place , date , desc} = req.body
       
    try{    
        const updateData = await Calendar.findOneAndUpdate({id} , {
                    title : subject,
                    place : place,
                    start : date,
                    desc : desc,
                    createAt : new Date(),
        })
        
        

        result = resResult(true, 200, "데이터 전송 완료", '');
    }catch(e){
        console.log(e);
        result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
    }finally{
        res.send(result);
    }   
});

//map 
router.get('/map' , async(req , res) => {
  
  
try{
    

    res.render('map/map'  )
}catch(err){    
    console.log("Error " , err)
}
})


//map placeList
router.get('/map/placeList/:title' , async(req , res) => {
    const {title} = req.params;

    try{

        res.render('map/insertPlace', {title})    
    }catch(err){
        console.error('Error' , err)
    }
})

router.get('/map/placeList' , async(req , res) => {

    try{

        res.render('map/placeList');    
    }catch(err){
        console.error('Error' , err)
    }
})

//map placeList insert
router.post('/map/insertPlace', async (req, res, next) =>{
    let result = new Object();
        const {name, date, chk} = req.body
     
        let id = shortid.generate()
    try{    
        
        if(chk === 'Y'){
            const createCal = await Calendar.create({
                title : name,
                place : name,
                start : date,
                id : id
            })
            const createPlace = await Place.create({
                place : name,
                start : date,
                cal   : chk
             }) 
            
        }else{
            const createPlace = await Place.create({
                place : name,
                start : date,
                cal   : chk
             }) 
        }

    
        result = resResult(true, 200, "데이터 전송 완료", chk);
    }catch(e){
        console.log(e);
        result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
    }finally{
        res.send(result);
    }   
});

module.exports = router;