import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all tasks
router.get("/", async (req, res) => {
  let collection = await db.collection("tasks");
  let result = await collection.find({}).toArray();
  res.send(result).status(200);
});

// create a task
router.post("/", async (req, res) => {
  console.log(req.body);
  let newTask = {
    content: req.body.content,
    // complete: req.body.complete,
  };

  let collection = await db.collection("tasks");
  let result = await collection.insertOne(newTask);
  res.send(result).status(204);
});

// update a task with id
router.put("/", async (req, res) => {
  const query = { _id: new ObjectId(req.body._id) };
  const updates = {
    $set: {
      content: req.body.content,
      // complete: req.body.complete,
    },
  };

  let collection = await db.collection("tasks");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// delete a task
router.delete("/", async (req, res) => {
  const query = {
    _id: new ObjectId(req.body._id),
  };

  const collection = db.collection("tasks");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
