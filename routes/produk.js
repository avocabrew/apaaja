const Produk = require("../controller/produk");

const uploadController = require("../controller/multiple.produk");
const router = require('express').Router()
const auth = require("../middlewares/auth.js");


//user router
router.post('/addProduk', auth, Produk.upload,Produk.addProduk);
router.get('/getAll' , Produk.getAllProduk);
router.put('/:id',   Produk.upload,Produk.updateProduk);
router.delete('/:id', auth, Produk.deleteProduk);
router.post(
    "/multiple-upload",
    uploadController.uploadImages,
    uploadController.resizeImages,
    uploadController.getResult
  );


module.exports = router;