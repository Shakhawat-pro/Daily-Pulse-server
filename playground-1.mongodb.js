// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('NewsDB');

// Create a new document in the collection.
db.getCollection('articles').insertMany([

    {
        "title": "Breaking News: Major Earthquake Hits City",
        "image": "https://i.ibb.co/WH5JbQZ/earthquake.jpg",
        "publisher": "Global News",
        "tags": ["breaking", "earthquake", "city"],
        "description": "A major earthquake has hit the city causing widespread damage and casualties.",
        "content": "A major earthquake with a magnitude of 7.8 struck the city today, causing widespread damage and numerous casualties. Emergency services are on the scene.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1234,
        "postedDate": "2024-06-04T10:00:00Z"
    },
    {
        "title": "Stock Market Reaches All-Time High",
        "image": "https://i.ibb.co/6m10j4V/stock.jpg",
        "publisher": "Finance Daily",
        "tags": ["finance", "stock market"],
        "description": "The stock market reached an all-time high today, with major indices showing significant gains.",
        "content": "The stock market soared to new heights today, with the Dow Jones, NASDAQ, and S&P 500 all reaching record levels. Investors are optimistic about the future.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 2567,
        "postedDate": "2024-06-03T14:30:00Z"
    },
    {
        "title": "New Tech Startup Disrupts Industry",
        "image": "https://i.ibb.co/ZfM47XT/tech.jpg",
        "publisher": "Tech Insider",
        "tags": ["technology", "startup"],
        "description": "A new tech startup is making waves in the industry with its innovative approach.",
        "content": "InnovateTech, a new startup, is disrupting the tech industry with its groundbreaking solutions. Investors are eager to see how the company will evolve.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "pending",
        "isPremium": false,
        "views": 789,
        "postedDate": "2024-06-02T09:15:00Z"
    },
    {
        "title": "Healthcare Advances: New Vaccine Developed",
        "image": "https://i.ibb.co/X4JrL3x/pexels-photo-2280571.jpg",
        "publisher": "Health Today",
        "tags": ["healthcare", "vaccine"],
        "description": "A new vaccine has been developed that promises to protect against multiple strains of the flu.",
        "content": "Researchers have developed a new vaccine that offers protection against several flu strains. Clinical trials show promising results.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1345,
        "postedDate": "2024-06-01T08:45:00Z"
    },
    {
        "title": "Sports Update: Championship Game Recap",
        "image": "https://i.ibb.co/J3hF73B/pexels-photo-1884574.jpg",
        "publisher": "Sports Weekly",
        "tags": ["sports", "championship"],
        "description": "A thrilling championship game concluded last night with a dramatic finish.",
        "content": "The championship game ended with a last-minute goal, securing the win for the underdog team. Fans are celebrating the unexpected victory.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 2310,
        "postedDate": "2024-05-31T21:00:00Z"
    },
    {
        "title": "Travel Tips: Top 10 Destinations for 2024",
        "image": "https://i.ibb.co/Y2n0KL9/pexels-photo-1008155.jpg",
        "publisher": "Travel Guide",
        "tags": ["travel", "destinations"],
        "description": "Explore the top 10 travel destinations for 2024 and start planning your next adventure.",
        "content": "From tropical beaches to bustling cities, these top 10 destinations offer something for every traveler. Discover where to go in 2024.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1456,
        "postedDate": "2024-05-30T18:20:00Z"
    },
    {
        "title": "Local News: Community Garden Initiative",
        "image": "https://i.ibb.co/qgBSR11/free-photo-of-butterfly-on-flower-in-garden.jpg",
        "publisher": "Local Times",
        "tags": ["local", "community"],
        "description": "A new community garden initiative is bringing neighbors together and promoting sustainability.",
        "content": "The community garden initiative has been a huge success, with residents coming together to grow fresh produce and foster a sense of community.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "pending",
        "isPremium": false,
        "views": 634,
        "postedDate": "2024-05-29T11:50:00Z"
    },
    {
        "title": "Entertainment: Summer Blockbusters to Watch",
        "image": "https://i.ibb.co/YfbJ6s5/sky-earth-space-working.jpg",
        "publisher": "Entertainment Weekly",
        "tags": ["entertainment", "movies"],
        "description": "Check out the must-watch summer blockbusters that are hitting theaters this season.",
        "content": "This summer's movie lineup includes a mix of action, comedy, and drama. Here are the top blockbusters you won't want to miss.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 1789,
        "postedDate": "2024-05-28T20:10:00Z"
    },
    {
        "title": "Food & Drink: Best New Restaurants of 2024",
        "image": "https://i.ibb.co/6R6mFqb/pexels-pablo-macedo-287472-845847.jpg",
        "publisher": "Gourmet Journal",
        "tags": ["food", "restaurants"],
        "description": "Discover the best new restaurants that have opened their doors in 2024.",
        "content": "From innovative fine dining to cozy cafes, these new restaurants are making waves in the culinary world. Here's where to eat in 2024.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1280,
        "postedDate": "2024-05-27T17:45:00Z"
    },
    {
        "title": "Science News: Breakthrough in Renewable Energy",
        "image": "https://i.ibb.co/ZfM47XT/tech.jpg",
        "publisher": "Science Daily",
        "tags": ["science", "energy"],
        "description": "Scientists have made a significant breakthrough in renewable energy technology.",
        "content": "A new technology promises to revolutionize the renewable energy sector, offering more efficient and sustainable energy solutions.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 2045,
        "postedDate": "2024-05-26T14:30:00Z"
    },
    {
        "title": "Lifestyle: Minimalism Trends in 2024",
        "image": "https://i.ibb.co/sP1NkYk/pexels-photo-135620.jpg",
        "publisher": "Lifestyle Magazine",
        "tags": ["lifestyle", "minimalism"],
        "description": "Explore the latest trends in minimalism and how to incorporate them into your life.",
        "content": "Minimalism continues to be a popular lifestyle choice. Here are the latest trends and tips for embracing a simpler, more intentional way of living.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1123,
        "postedDate": "2024-05-25T09:00:00Z"
    },
    {
        "title": "Education: New Approaches to Online Learning",
        "image": "https://i.ibb.co/BL2QkW2/pexels-photo-1001914.jpg",
        "publisher": "Education Today",
        "tags": ["education", "online learning"],
        "description": "Innovative approaches to online learning are transforming education.",
        "content": "The pandemic accelerated the adoption of online learning. Now, new approaches and technologies are making online education more effective and accessible.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 1870,
        "postedDate": "2024-05-24T16:40:00Z"
    },
    {
        "title": "Politics: Election Season Heats Up",
        "image": "https://i.ibb.co/HTn71Sf/pexels-photo-1550340.jpg",
        "publisher": "Political Review",
        "tags": ["politics", "election"],
        "description": "The upcoming election season is heating up with candidates making their final pitches to voters.",
        "content": "As election day approaches, candidates are ramping up their campaigns. Here's a look at the key issues and players in this year's race.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1324,
        "postedDate": "2024-05-23T10:20:00Z"
    },
    {
        "title": "Environment: Conservation Efforts Gain Momentum",
        "image": "https://i.ibb.co/WH8XYHg/pexels-photo-1464223.jpg",
        "publisher": "Eco World",
        "tags": ["environment", "conservation"],
        "description": "Conservation efforts are gaining momentum as more people become aware of environmental issues.",
        "content": "From protecting endangered species to reducing pollution, conservation efforts are making a significant impact. Learn more about what's being done and how you can help.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 1765,
        "postedDate": "2024-05-22T13:15:00Z"
    },
    {
        "title": "Fashion: Summer Trends for 2024",
        "image": "https://i.ibb.co/sP1NkYk/pexels-photo-135620.jpg",
        "publisher": "Fashion Forward",
        "tags": ["fashion", "summer trends"],
        "description": "Discover the hottest fashion trends for the summer of 2024.",
        "content": "From bold colors to sustainable fabrics, these are the fashion trends you'll be seeing everywhere this summer. Update your wardrobe with these stylish picks.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1490,
        "postedDate": "2024-05-21T11:30:00Z"
    },
    {
        "title": "Business: Startup Secures Major Funding",
        "image": "https://i.ibb.co/6m10j4V/stock.jpg",
        "publisher": "Business Weekly",
        "tags": ["business", "startup"],
        "description": "A promising startup has secured significant funding to expand its operations.",
        "content": "TechGrow, a promising startup, has secured $50 million in funding from top investors. The company plans to use the funds to expand its operations and enter new markets.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 2045,
        "postedDate": "2024-05-20T15:00:00Z"
    },
    {
        "title": "Real Estate: Housing Market Trends for 2024",
        "image": "https://i.ibb.co/56jBWxP/pexels-photo-7168016.jpg",
        "publisher": "Real Estate News",
        "tags": ["real estate", "housing market"],
        "description": "Get the latest insights into the housing market trends for 2024.",
        "content": "The housing market is showing signs of change, with increased demand for suburban homes and rising prices. Here are the key trends to watch in 2024.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1780,
        "postedDate": "2024-05-19T14:00:00Z"
    },
    {
        "title": "Technology: Advances in AI",
        "image": "https://i.ibb.co/ZfM47XT/tech.jpg",
        "publisher": "Tech World",
        "tags": ["technology", "AI"],
        "description": "New advances in artificial intelligence are transforming various industries.",
        "content": "AI technology is advancing at a rapid pace, offering new solutions for industries ranging from healthcare to finance. Here's a look at the latest developments.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 1956,
        "postedDate": "2024-05-18T11:00:00Z"
    },
    {
        "title": "Automotive: Electric Vehicles on the Rise",
        "image": "https://i.ibb.co/2KDZ5Ck/free-photo-of-red-sports-tesla-in-park.jpg",
        "publisher": "Auto Trends",
        "tags": ["automotive", "electric vehicles"],
        "description": "Electric vehicles are gaining popularity as more models hit the market.",
        "content": "The electric vehicle market is expanding rapidly, with new models offering improved range and features. Here's what to expect from the latest EVs.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": false,
        "views": 1430,
        "postedDate": "2024-05-17T13:50:00Z"
    },
    {
        "title": "Finance: Tips for Managing Your Investments",
        "image": "https://i.ibb.co/6m10j4V/stock.jpg",
        "publisher": "Finance Tips",
        "tags": ["finance", "investments"],
        "description": "Expert tips for managing your investments and maximizing returns.",
        "content": "Investment experts share their top tips for managing your portfolio and making smart investment decisions. Learn how to maximize your returns and minimize risks.",
        "author": {
            "name": "MD.Shakhawat Hossain",
            "email": "shr2692004@gmail.com",
            "photo": "https://i.ibb.co/mqtWjCF/4.png",
            
        },
        "status": "approved",
        "isPremium": true,
        "views": 1690,
        "postedDate": "2024-05-16T12:30:00Z"
    }



]);
