const express = require('express');
const router = express.Router();
const story = require('../models/story')
//path
const path = require('path')
const resResult = require('./common/resResult')

//multer 
const multer = require('multer');
//define multerStorage for the image
const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
      callback(null, './public/uploades/images');
    },
  
    //add back the extension
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname , extension);
        callback(null , basename + "_" + Date.now() + extension)
    },
  });

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
      files: 1,
      fieldSize: 1024 * 1024 * 100,
    },
  });

router.get('/storylist', async (req, res) => {
    let storyList
    let {page} = req.query
    try{  

      const totalCnt = await story.countDocuments()

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

      storyList = await story.find().sort({"_id" : -1}).skip(hidePost).limit(maxPost)

      res.render('story/storyList', {storyList
              , startPage, 
              endPage, 
              hidePost, 
              maxPost, 
              totalPage, 
              currentPage,
              page,
            })

    }catch(e){
      console.error(e);
    }
   
})

router.get('/insert', (req, res) => {
    res.render('story/storyInsert')
})

router.post('/upload/img', upload.single('formFile'),  async(req, res) => {
    let result = new Object();

    const fileName = req.file ? req.file.filename : "";
    try{
     

        
      result = resResult(true, 200, "데이터 전송 완료", fileName);
    }catch(e){
        console.log(e);
        result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
    }finally{
        res.send(result);
    } 
})


router.post('/insert',  async(req, res) => {
    let result = new Object();
    const {title, textarea, imgName} = req.body
  
  try{   

    let randomNum = Math.floor(Math.random() * 400);
    
    const findSlug = await story.findOne({slug : randomNum})
    
    if(!findSlug){    
      const resultData = await story.create({
          slug : randomNum,
          title : title,
          content : textarea,
          img : imgName
      }) 
    }else{

      const id = findSlug.slug

      randomNum = Math.floor(Math.random() * 600);
      const updateData = await Calendar.findOneAndUpdate({id} , {
            slug : randomNum,
      })
      
    }

    result = resResult(true, 200, "데이터 전송 완료", "");
  }catch(e){
      console.log(e);
      result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
  }finally{
      res.send(result);
  } 
})



router.get('/storylist/:no', async (req, res) => {
      const {no} = req.params
  try{
    const detail = await story.findOne({slug : no}).exec();
    
    res.render('story/storyUpdate', {detail})
  }catch(err){
    console.error(err)
  }
  

})


router.put('/update',  async(req, res) => {
  let result = new Object();
  const {title, textarea, imgName, slug} = req.body

try{   

  const update = await story.findOneAndUpdate({slug : slug}, {
        title : title,
        content : textarea,
        img : imgName,
        createAt : Date.now()
                        
  })

  result = resResult(true, 200, "데이터 전송 완료", "");
}catch(e){
    console.log(e);
    result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
}finally{
    res.send(result);
} 
})

module.exports = router;