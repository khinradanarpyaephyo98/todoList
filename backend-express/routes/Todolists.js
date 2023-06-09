const express = require("express");
const router = express.Router();
const { Todolists } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfTodo = await Todolists.findAll();
  res.json(listOfTodo);
  console.log("list",listOfTodo[0])
});

router.get("/:userId", async (req, res) => {
  const ID=req.params.userId;
  const listOfTodo = await Todolists.findAll({
    where:{
      UserId:ID
    }
  });
  res.json(listOfTodo);
  console.log("ok in extracting dolist by ID ... ",listOfTodo)
});


router.post("/", validateToken,async (req, res) => {
  const doTask= req.body;
  if(doTask.task==""){
    return res.send({error:"Please insert the task !"})
  }
  else{
    await Todolists.create(doTask);
    console.log("success in adding task to db ")
    res.json(doTask);
  }
  
});


router.delete("/:userId", validateToken,async (req, res) => {
    const userID = req.params.userId;
  
    await Todolists.destroy({
      where: {
        UserId: userID,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });

module.exports = router;