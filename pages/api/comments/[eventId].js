import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://nextjscourse:nextjscourse@cluster0.lhbqrpk.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("events");

  if (req.method === "POST") {
    // add server side validation
    const { email, name, text } = req.body;

    if (!email.includes("@") || name.trim() === "" || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection("comments").insertOne(newComment);

    console.log("my result: ");
    console.log(result);
    res.status(201).json({ message: "Added comment", comment: newComment });
    client.close();
    return;
  }

  if (req.method === "GET") {
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray(); // sort id on decending order
    res.status(200).json({ comments: documents });
    client.close();
    return;
  }

  
}

export default handler;
