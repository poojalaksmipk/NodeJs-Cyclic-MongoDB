require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/books");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send({ title: "Books" });
});

app.get("/add-note", async (req, res) => {
  try {
    await Book.insertMany([
      {
        title: "sons of Anarchy",
        body: "Body text goes here..",
      },
      {
        title: "Game of throne",
        body: "Body text goes here..",
      },
    ]);
  } catch (error) {
    console.log("err", +error);
  }
});

app.get('/books', async (req,res)=>{
comst book = await Book.find();

if(book){
    res.json(book)
}else{
    res.send("Something went wrong.");
}


});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
