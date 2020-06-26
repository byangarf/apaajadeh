const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database/database');
// const fileUpload = require("express-fileupload");
// const util = require("util");
// const path = require("path");

router.get('/', (req,res) =>{
    res.status(200).json('server and database is connected');

});

router.get('/hello',(req,res)=>
{
    res.send("Hello World");
});

// router.get('/:merchants', (req,res)=> {
//     mysqlConnection.query('select * from merchant;',(error,rows,fields)=>{
//         if(!error){
//             res.json(rows);
//         }
//         else{
//             console.log(error);
//         }
//     });
// });

// router.get('/:merchants/:idmerchant', (req,res)=>{
//     const {idmerchant}=req.params;
//     mysqlConnection.query('select * from merchant where idmerchant = ?;',[idmerchant],(error,rows,fields)=>{
//         if(!error){
//             res.json(rows);
//         }
//         else{
//             console.log(error);
//         }
//     });
// });

// router.delete('/:merchants/:idmerchant', (req,res) =>
// {
//     const {idmerchant} = req.params;
//     mysqlConnection.query('delete from user where idmerchant = ?;', [idmerchant], (error,rows,fields)=>
//     {
//         if(!error){
//             res.json({Status: 'user deleted'});
//         }
//         else{
//             res.json({Status: error});
//         }
//     });
// });

router.get('/:merchants/viewall', (req,res)=> {
    mysqlConnection.query('select * from merchant;',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    });
});

// router.get('/:testing/viewall', (req,res)=> {
//     mysqlConnection.query('select * from merchant;',(error,rows,fields)=>{
//         if(!error){
//             //res.json({Status : 'merchant'})
//             var a = {
//                 Merchant: [
//                     res.json(rows)
//                 ]
//                };
//             res.json(a);
//         }
//         else{
//             console.log(error);
//         }
//     });
// });

router.post('/:merchants/view', (req,res)=>{
    const {merchantLocationId}=req.body;
    console.log(req.body);
    mysqlConnection.query('select * from merchant where merchantLocationId = ?;',[merchantLocationId],(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    });
});

router.post('/:merchants/insert',(req,res)=>{
    const {idmerchant, merchantName, merchantLocation, merchantLocationId} = req.body;
    console.log(req.body);
    mysqlConnection.query('insert into merchant(idmerchant,merchantName,merchantLocation,merchantLocationId) values(?,?,?,?);',
    [idmerchant,merchantName,merchantLocation,merchantLocationId], (error,rows,fields) =>{
        if(!error){
            res.json({Status: 'Merchant saved'});
        }
        else{
            console.log(error);
        }
    });
});

router.post('/:merchants/updated',(req,res)=>
{
    const {idmerchant, merchantName, merchantLocation, merchantLocationId} = req.body;
    console.log(req.body);
    mysqlConnection.query('update merchant set merchantName = ?, merchantLocation = ?, merchantLocationId = ? where idmerchant = ?;',
    [merchantName,merchantLocation,merchantLocationId,idmerchant], (error,rows,fields) => {
        if(!error){
            res.json({Status: 'user updated'});
        }
        else{
            console.log(error);
        }
    });
});

router.post('/:merchants/delete', (req,res) =>
{
    const {idmerchant} = req.body;
    console.log(req.body);
    mysqlConnection.query('delete from merchant where idmerchant = ?;', [idmerchant], (error,rows,fields)=>
    {
        if(!error){
            res.json({Status: 'user deleted'});
        }
        else{
            res.json({Status: error});
        }
    });
});
/////// order

var crypto = require('crypto')
biguint = require('biguint-format')

function randomValueHex(len) {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, len) // return required number of characters
  }
function randomValueBase64(len) {
  return crypto
    .randomBytes(Math.ceil((len * 3) / 4))
    .toString('base64') // convert to base64 format
    .slice(0, len) // return required number of characters
    .replace(/\+/g, '0') // replace '+' with '0'
    .replace(/\//g, '0') // replace '/' with '0'
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
// var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname)
//     }
// })

// var upload = multer({ storage: storage })

// router.post('/:orders/uploads', upload.array(5),function(req, res, next) {
//     var fileinfo = req.files;
//     var title = req.body;
//     console.log(title);
//     res.send(fileinfo);
// })

// router.post('/:orders/upload', upload.single, function(req, res, next) {
//     var fileinfo = req.file;
//     var title = req.body;
//     console.log(title);
//     res.send(fileinfo);
//   })
// router.post('/:orders/upload',async (req, res) => {
//     try {
//       const file = req.files.file;
//       const fileName = file.name;
//       const size = file.data.length;
//       const extension = path.extname(fileName);
  
//       const allowedExtensions = /png|jpeg|jpg|gif/;
  
//       if (!allowedExtensions.test(extension)) throw "Unsupported extension!";
//       if (size > 5000000) throw "File must be less than 5MB";
    
//       const md5 = file.md5;
//       const URL = '/uploads/' + md5 + extension;
  
//       await util.promisify(file.mv)('./public' + URL);
  
//       res.json({
//         message: 'File uploaded successfully!',
//         url: URL,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: err,
//       });
//     }
// });
  
router.post('/:orders/viewallorder', (req,res)=> {
    mysqlConnection.query('select * from semangat.order;',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
            
        }
    });
});

router.post('/:admins/viewordermerchant', (req,res)=> {
    const {merchantId}=req.body;
    console.log(req.body);
    mysqlConnection.query('select * from semangat.order where merchantId = ?;',[merchantId],(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            res.json({Status:'Tidak ada orderan'});
            
        }
    });
});

router.post('/:orders/tracking', (req,res)=>{
    const {codeBooking}=req.body;
    console.log(req.body);
    mysqlConnection.query('SELECT o.idOrder,o.username,m.merchantName,m.merchantLocation,m.merchantEmail,o.pengambilanOrder,o.status,o.StatusPembayaran,m.phoneNum FROM semangat.order o, semangat.merchant m WHERE o.merchantId = m.idmerchant AND o.codeBooking LIKE ?;',[codeBooking],(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
            res.json({Status: 'kode booking salah'});
        }
    });
});
router.post('/:orders/inputOrder',(req,res)=>
{
    const
    {
        jnsOrder,
        keteranganOrder,
        // priceOrder = halOrder * 1000,
        // ukrKertas,
        // uploadFile,
        username,
        noHp,
        pengambilanOrder,
       // value1 = 'US'+randomValueBase64(3),
        value1 = 'US'+getRandomInt(9)+getRandomInt(9)+getRandomInt(9),
        merchantId,
        status
    } = req.body;
    console.log(req.body);
    mysqlConnection.query('insert into semangat.order(jnsOrder,keterangan,username,noHp,pengambilanOrder,codeBooking,merchantId,status) values(?,?,?,?,?,?,?,?);',
    [jnsOrder,keteranganOrder,username,noHp,pengambilanOrder,value1,merchantId,status],(error,rows,fields)=>
    {
        if(!error){

            res.json(value1);
        }
        else{
            res.json({Status: error});
        }
    });
});
//user
// router.post('/:users/loginUser', (req,res)=>{
//     const {usernameuser}=req.body;
//     console.log(req.body);
//     if (usernameuser){
//         mysqlConnection.query('select * from semangat.user where username = ?;',[usernameuser],(error,rows,fields)=>{
            
//             if(!error){
//                 res.json({Status: 'Login Succes'});
//             }
//             else{
//                 res.json({Status: 'Incorrect Username!'});
//             }
//         });
//     }
//     else
//     {
//         res.json({Status: 'Please enter Username User!'});
//     }
// });

//admin
// router.post('/:admins/login', (req,res)=>{
//     const {usernameAdmin,password}=req.body;
//     console.log(req.body);
//         mysqlConnection.query('select * from semangat.merchant where usernameAdmin = ? AND password = ?;',[usernameAdmin,password],(error,rows,fields)=>{
            
//             if(!error){
//                 // mysqlConnection.query('select * from semangat.order where merchantId = ?;',(error,rows,fields)=>{
//                 // res.json(rows);
//                 // });
//                 res.json({Status: 'Login Succes'});
//             }
//             else{
//                 console.log(error);
//                 //res.json({Status: 'Incorrect Username and/or Password!'});
//             }
//         });
  
// });

router.post('/:admins/testingLogin', (req,res)=> {
    const {testUsernameAdmin,testPassword}=req.body;
    console.log(req.body);
    mysqlConnection.query('select idmerchant from semangat.merchant where usernameAdmin = ? And password = ?;',[testUsernameAdmin,testPassword],(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
            
        }
    });
});
router.post('/:admins/inputsOrder',(req,res)=>
{
    const
    {
        jnsOrder,
        keteranganOrderAdm,
        username,
        noHp,
        pengambilanOrder,
        value2 = 'AM'+getRandomInt(9)+getRandomInt(9)+getRandomInt(9),
        //value1 = format(random(8), 'hex', { prefix: '0x' }),
        merchantId,
        status
    } = req.body;
    console.log(req.body);
    mysqlConnection.query('insert into semangat.order(jnsOrder,keterangan,username,noHp,pengambilanOrder,codeBooking,merchantId,status) values(?,?,?,?,?,?,?,?);',
    [jnsOrder,keteranganOrderAdm,username,noHp,pengambilanOrder,value2,merchantId,status],(error,rows,fields)=>
    {
        if(!error){
            res.json(value2)
        }
        else{
            res.json({Status: error});
        }
    });
});
router.post('/:admins/changeStatus',(req,res)=>{
    const {statusOrder, idOrder} = req.body;
    console.log(req.body);
    mysqlConnection.query('UPDATE `semangat`.`order` SET `status` = ? WHERE (`idorder` = ?);',
    [statusOrder,idOrder], (error,result,fields) =>{
        // if(statusOrder != 'belum diproses' && statusOrder !='sedang diproses' && statusOrder !='sudah selesai')
        // {
        //     res.json({Status :'status yang anda masukkan salah'})
        // }
        if (!error){
            res.json({Status: 'Status saved'});
        }
        else{
            console.log(error);
        }
    });
});


router.post('/:admins/registrasi',(req,res)=>{
    const {usernameAdm, merchantName, merchantLocation, merchantLocationId,password,merchantEmail,noHpRegist} = req.body;
    console.log(req.body);
    mysqlConnection.query('insert into merchant(usernameAdmin,merchantName,merchantLocation,merchantLocationId,password,merchantEmail,phoneNum) values(?,?,?,?,?,?,?);',
    [usernameAdm,merchantName,merchantLocation,merchantLocationId,password,merchantEmail,noHpRegist], (error,rows,fields) =>{
        if(error){
            res.json({Status: 'username / no telp sudah terdaftar '});
        }
        else{
            res.json({Status: 'Pendaftaran Berhasil'});
        }
    });
});




module.exports = router;