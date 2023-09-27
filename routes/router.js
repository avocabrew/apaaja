const router = require("express").Router();

const user = require("./user.router.js");
const kategori = require("./kategori.router.js");
const brands = require("./brands.js");
const Produk = require("./produk.js");
const homeController = require("../controller/home");





router.use("/users", user);
router.use("/kategori", kategori);
router.use("/brands", brands);
router.use("/produk", Produk);

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});







// router.get("/", homeController.getHome);





router.get("/profile", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.send("silahkan Login terlebih dahulu");
});

module.exports = router;
