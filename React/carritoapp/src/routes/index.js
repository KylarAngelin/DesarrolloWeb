const { Router } = require('express');
const router = Router();

const User = require('../models/users');
const UserAdmin = require('../models/userAdmin');
const Products = require('../models/products');

const jwt = require('jsonwebtoken');


router.post('/signup',  async (req, res)=>{
  console.log(req.body)
  const { email, password } = req.body;
  const alreadyUser = await User.findOne({email: email})
  if(alreadyUser){
    return res.status(401).send("The email already exists");
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password)
    console.log(newUser);
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'secretkey')
    res.status(200).json({token})
  }

})



router.post('/signin', async (req, res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({email:email})
  console.log(user)
  if(!user){
    return res.status(402).send("The email doesn't exists");
  }

  if(!user.comparePassword(password)){
    return res.status(401).send("Wrong Password");
  }

  const token = jwt.sign({_id: user._id}, 'secretkey')
  res.status(200).json({token})
})

router.post('/signin-admin', async (req, res)=>{
  const { email, password } = req.body;
  const userAdmin = await UserAdmin.findOne({email:email})
  console.log(userAdmin)
  if(!userAdmin){
    return res.status(401).send("The email doesn't exists");
  }

  if(!userAdmin.comparePassword(password)){
    return res.status(401).send("Wrong Password");

  }

  const tokenAdmin = jwt.sign({_id: userAdmin._id}, 'secretkey')
  res.status(200).json({tokenAdmin})
})



router.post('/products-add',  async (req, res)=>{
  const { nombre, precio, cantidad } = req.body;
  //console.log(email, password)
  const alreadyProducts = await Products.findOne({nombre: nombre})
  if(alreadyProducts){
    return res.status(401).send("The product already exists");
  } else {
    const newProduct = new Products();
    newProduct.nombre = nombre;
    newProduct.precio = precio;
    newProduct.cdisponible = cantidad;
    console.log(newProduct);
    await newProduct.save();
    res.status(200).json("Product saved successfully")
  }

})


router.get('/products', async (req, res) => {
  const products = await Products.find()
  res.json(products)
})

router.get('/private-products', verifyToken, (req, res)=>{
res.send('Data private-products')
})



router.post('/pay-order', async (req, res) => {
  //console.log(req.body)
   const arrProducts = req.body;
   for(i=0; i<arrProducts.length;){
     console.log(arrProducts[i])
     const updateProduct = new Products();
     updateProduct.nombre = arrProducts[i].nombre;
     updateProduct.precio = arrProducts[i].precio;
     updateProduct.cdisponible = arrProducts[i].cdisponible;
     console.log(updateProduct);
     i++;
     await Products.updateOne({nombre: updateProduct.nombre}, {nombre: updateProduct.nombre, precio: updateProduct.precio, cdisponible: updateProduct.cdisponible});

   }
  res.status(200).json("Product saved successfully")
})

router.get('*', (req, res) => {
  res.send("Hello World")
})




module.exports = router;

function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('No autorizado')
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token === 'null'){
    return res.status(401).send('No autorizado')
  }
  const payload = jwt.verify(token, 'secretkey')
  console.log(payload)
  req.userId = payload._id;
  next();
}

function verifyTokenAdmin(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('No autorizado')
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token === 'null'){
    return res.status(401).send('No autorizado')
  }
  const payload = jwt.verify(token, 'secretkey')
  console.log(payload)
  req.userId = payload._id;
  next();
}
