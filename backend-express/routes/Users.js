const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  console.log("user ..",user)
  if(!user){
    console.log(password)
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
          username: username,
          password: hash,
        });
      return res.send("SUCCESS");
      });
  }
  else{
    return res.send({error:" User already exists"})
  }
  
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        return res.send({ error: "User : "+ username+" Doesn't Exist. !!!" });
    }
    
    bcrypt.compare(password, user.password).then(async (match) => {
    if (!match){
        return res.send({ error: "Wrong Username And Password Combination!!" });
    }
    else{
        const accessToken = sign(
            { username: user.username, id: user.id },
            "importantsecret"
            );
        console.log("accessoken",accessToken)
        res.json({"token":accessToken,"userId":user.id});
        }
    }
    );
            
    
});



module.exports = router;