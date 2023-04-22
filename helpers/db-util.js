import {MongoClient} from 'mongodb'

export async function connectDataBase() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjscourse:nextjscourse@cluster0.lhbqrpk.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("client returned")
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db("events");
  console.log("db-util insert comment")
  const result = await db.collection(collection).insertOne(document);
  console.log("insert result", result)
  return result;
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db('events')
    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray(); // sort id on decending order
    console.log("get documents")
    console.log(documents)
    return documents;
}