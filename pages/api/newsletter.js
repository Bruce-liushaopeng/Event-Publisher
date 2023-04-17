import {insertDocument, connectDataBase} from '../../helpers/db-util'

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if(!userEmail || !userEmail.includes('@')) {
        res.status(422).json({message: "Invalid email address."})
        return;
    } 
    let client;
    try{
       client = await connectDataBase();
    } catch(error) {
      console.log("error connect client ")
      res.status(500).json({message: 'connecting to the database failed'});
      return;
    }

    try{
      insertDocument(client, 'newsletter', {email: userEmail})
      client.close();
    } catch(error){
      console.log("error insert document")
      res.status(500).json({message: 'Insert failed'})
      return;
    }
    
    const db = (await client).db();

    

    client.close();
    res.status(201).json({message: "signed up"})
  }
}

export default handler;
