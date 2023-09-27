const db = require("../models");

//image upload
const multer = require("multer");
const path = require("path");

//create main model
const Produks = db.produk;

//1. Create Produks

const addProduk = async (req, res) => {
  let info = {
    nama_produk: req.body.nama_produk,
    harga: req.body.harga,
    diskon: req.body.diskon,
    kode: req.body.kode,
    tanggal: req.body.tanggal,
    spesifikasi: req.body.spesifikasi,
    category_id: req.body.category_id,
    user_id: req.body.user_id,
    keterangan: req.body.keterangan,
    image: req.file.path,
  };
  const produk = await Produks.create(info);
  res.status(200).send(produk);
  console.log(produk);
};

//2. get all Produks

const getAllProduk = async (req, res) => {
  try {
    let Produk = await Produks.findAll({});

    if (!Produk) {
      res.send("Job post not found");
    }
    res.status(200).send(Produk);
  } catch (error) {
    res.json(error);
  }
};

//3. Update brand post

const updateProduk = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req.body);
    let info = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        diskon: req.body.diskon,
        kode: req.body.kode,
        tanggal: req.body.tanggal,
        spesifikasi: req.body.spesifikasi,
        category_id: req.body.category_id,
        keterangan: req.body.keterangan,
        image: req.file.path,
    };
    if (req.file) {
      const img = req.file.path;
      info.image = img;
    }
    let Produk = await Produks.update(info, { where: { id: id } });
    console.log(Produk);
    res.status(200).send("Brand updated");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//4. Delete brand post

const deleteProduk = async (req, res) => {
  let id = req.params.id;
  await Produks.destroy({ where: { id: id } });
  res.status(200).json("User has been deleted....");
};

// 8. Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

module.exports = {
  addProduk,
  getAllProduk,
  updateProduk,
  deleteProduk,
  upload,
};