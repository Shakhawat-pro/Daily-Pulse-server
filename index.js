const express = require('express');
const app = express()
const cors = require('cors');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const { MongoClient, ServerApiVersion, Admin } = require('mongodb');
const port = process.env.PORT || 5000


// middleware

app.use(cors())
app.use(express.json())

const verifyToken = (req, res, next) => {
  // console.log("Req ........",req);
  // console.log("inside Verify Token",req.headers.authorization.split(' ')[1]);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorize Access' })
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: 'Unauthorize Access' })
    }
    req.decoded = decoded;
    next()
  })
}

// use verify admin after verifyToken
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  const isAdmin = user?.role === 'admin';
  if (!isAdmin) {
    return res.status(403).send({ message: 'forbidden access' });
  }
  next();
}




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t8njxkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const articleCollection = client.db('NewsDB').collection('articles')
    const userCollection = client.db('NewsDB').collection('users')
    const publisherCollection = client.db('NewsDB').collection('publishers')

    // use verify Premium after verifyToken
    const verifyPremium = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isPremium = user?.premiumTaken === null;
      if (isPremium) {
        return res.status(403).send({ message: 'User is not premium member' });
      }
      next();
    }


    // jWT API

    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' })
      res.send({ token })
    })

    // Articles

    app.get('/articles', async (req, res) => {
      const result = await articleCollection.find({ status: 'approved' }).sort({ views: -1 }).toArray()
      res.send(result)
    })
    app.get('/premiumArticles', verifyToken, verifyPremium, async (req, res) => {
      const result = await articleCollection.find({ isPremium: true }).sort({ views: -1 }).toArray()
      // console.log(result);
      res.send(result)
    })


    app.post('/articles', verifyToken, async (req, res) => {
      const data = req.body
      const email = req.decoded.email
      const user = await userCollection.findOne({ email: email })
      if (user.premiumTaken !== null) {
        const result = await articleCollection.insertOne(data)
        return res.json({ message: 'Article posted successfully', result });
      }
      const existingArticle = await articleCollection.findOne({ 'author.email': email })
      if (existingArticle) {
        return res.json({ message: 'Non-premium users can only post one article' });
      }
      const result = await articleCollection.insertOne(data);
      return res.json({ message: 'Article posted successfully', result });
    })

    // publishers related api
    app.get('/publishers', async (req, res) => {
      const result = await publisherCollection.find().toArray()
      res.send(result)
    })

    // user related api

    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    app.get('/user/isPremium/:email', verifyToken, async (req, res) => {
      const email = req.params.email
      const query = { email: email }
      if (email !== req.decoded.email) {
        return res.status(401).send({ message: 'Unauthorized Access' })
      }
      const user = await userCollection.findOne(query)
      let isUserPremium = false
      if (user) {
        isUserPremium = user?.premiumTaken !== null
      }
      // console.log(isUserPremium);
      // console.log(user?.premiumTaken);
      res.send({ isUserPremium })
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      // console.log(user);
      const query = { email: user.email }
      const existingUser = await userCollection.findOne(query)
      if (existingUser) {
        return res.send({ message: 'user already existed', insertedId: null })
      }
      const result = await userCollection.insertOne(user)
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Daily pulse running')
})

app.listen(port, () => {
  console.log('Daily pulse is running om port', port);
})