const express = require('express');
const app = express()
const cors = require('cors');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const { MongoClient, ServerApiVersion, Admin, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)



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
    const paymentCollection = client.db("NewsDB").collection("payments");

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


    // jWT API

    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' })
      res.send({ token })
    })

    //Admin Articles

    app.get('/articles', async (req, res) => {
      const { search, publisher, tags } = req.query;
      let query = { status: 'approved' };
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
      if (publisher) {
        query.publisher = publisher;
      }
      if (tags) {
        query.tags = { $all: tags.split(',') };
      }
      const articles = await articleCollection.find(query).sort({ views: -1 }).toArray();
      res.send(articles)
    })

    app.get('/myArticles', verifyToken, async (req, res) => {
      const email = req.decoded.email
      // console.log(email);
      const result = await articleCollection.find({ "author.email": email }).toArray()
      res.send(result)
    })

    app.get('/myArticles/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const update = { $inc: { views: 1 } };
      const options = { returnOriginal: false };
      const result = await articleCollection.findOneAndUpdate(filter, update, options)
      res.send(result)
    })
    
    app.patch('/myArticles/:id', verifyToken, async (req, res) => {
      const data = req.body
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          title: data.title,
          image: data.image,
          tags: data.tags,
          description: data.description,
          content: data.content,
          author: {
            name: data.author.name,
            email: data.author.email,
            photo: data.author.photo
          },
          status: "pending"
        }
      }
      // console.log(updatedDoc);
      const result = await articleCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.get('/allArticles', verifyToken, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const articles = await articleCollection.find().skip(skip).limit(limit).toArray();
      const totalArticles = await articleCollection.countDocuments();

      res.send({
        articles,
        totalArticles,
        totalPages: Math.ceil(totalArticles / limit),
        currentPage: page
      });

    });

    app.patch('/allArticles/accept/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          status: "approved"
        }
      }
      const result = await articleCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })
    app.patch('/allArticles/premium/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          isPremium: true
        }
      }
      const result = await articleCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })
    app.patch('/allArticles/reject/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const rejectReason = req.body
      // console.log(rejectReason);
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          status: "rejected",
          reason: rejectReason.reason
        }
      }
      const result = await articleCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.delete('/allArticles/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await articleCollection.deleteOne(query);
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

    app.post('/publishers', verifyToken, verifyAdmin, async (req, res) => {
      const data = req.body
      console.log(data);
      const result = await publisherCollection.insertOne(data)
      res.send(result)
    })

    // user related api

    app.get('/users', verifyToken, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const users = await userCollection.find().skip(skip).limit(limit).toArray();
      const totalUsers = await userCollection.countDocuments();

      res.send({
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      });

    });

    app.get('/userCount', async (req, res) => {
      const allUsersCount = await userCollection.countDocuments();

      const currentDate = new Date();
      const premiumUsersCount = await userCollection.countDocuments({ premiumTaken: { $ne: null } });
      const nonPremiumUsersCount = allUsersCount - premiumUsersCount;

      res.send({
        totalUsers: allUsersCount,
        premiumUsers: premiumUsersCount,
        nonPremiumUsers: nonPremiumUsersCount
      });
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

    app.get('/user/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email
      if (email !== req.decoded.email) {
        return res.status(401).send({ message: 'Unauthorized Access' })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query)
      let admin = false
      if (user) {
        admin = user?.role === "admin"
      }
      res.send({ admin })
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      // console.log(user);
      const query = { email: user.email }
      console.log(user);
      const existingUser = await userCollection.findOne(query)
      if (existingUser) {
        return res.send({ message: 'user already existed', insertedId: null })
      }

      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    app.patch('/users/admin/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.patch('/users/guest/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'user'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })


    app.delete('/users/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })

    app.patch('/update-premium', async (req, res) => {
      const data = req.body
      console.log(data);
      const filter = { email: data.email }
      const updatedPremium = {
        $set: {
          premiumTaken: data.premiumTaken
        }
      }
      const result = await userCollection.updateOne(filter, updatedPremium)
      console.log(result);
      res.send(result)
    })

    // payment intent
    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      // console.log(amount, 'amount inside the intent')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    });

    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
    app.patch('/user/:email', async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updatedPremium = {
        $set: {
          premiumTaken: null
        }
      }
      const result = await userCollection.updateOne(filter, updatedPremium);
      res.send(result);
    });


    app.patch('/profile/:email', async (req, res) => {
      const data = req.body
      const email = req.params.email;
      const filter = { email: email };
      const updateProfile = {
        $set: {
          name: data.name,
          profilePicture: data.photoURL,

        }
      }
      const result = await userCollection.updateOne(filter, updateProfile);
      res.send(result);
    });

    app.patch('/homePage/showIt/:id', async(req, res) =>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const update ={
        $set:{
          editorPick: true
        }
      }
      const result = await articleCollection.updateOne(filter, update)
      res.send(result)
    })
    app.patch('/homePage/hideIt/:id', async(req, res) =>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const update ={
        $set:{
          editorPick: false
        }
      }
      const result = await articleCollection.updateOne(filter, update)
      res.send(result)
    })
    app.get('/editorArticles', async(req, res) =>{
      const result = await articleCollection.find({"editorPick" : true}).toArray()
      res.send(result)
    })






    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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