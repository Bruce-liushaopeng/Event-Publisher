function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    // add server side validation
    const { email, name, text } = req.body;

    if (!email.includes("@") || name.trim() === "" || text.trim() === "") {
        res.status(422).json({message: "Invalid input."})
        return;
    }
    const newComment = {
        id: new Date().toISOString(),
    }
    console.log(newComment);
    res.status(201).json({message: "Added comment", comment: newComment});
  }

  if (req.method === "GET") {
    const dummyList = [
        {id:'v1', name: "Max", text: "A first comment !"},
        {id:'v2', name: "Max", text: "A first comment !"},
        {id:'v3', name: "Max", text: "A first comment !"},
    ];

    res.status(200).json({comment: dummyList});
  }
}

export default handler;
