// require express and other modules
const express = require('express');
const app = express();

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/WalrusMaximus/Personal-API",
    baseUrl: "https://walrusmaximus-personalapi.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/albums", description: "Index albums"},
      {method: "GET", path: "/api/albums/:id", description: "Show one album"},
      {method: "POST", path: "/api/albums/", description: "Create one album"},
      {method: "PUT", path: "/api/albums/:id", description: "Update one album"},
      {method: "DELETE", path: "/api/albums/:id", description: "Delete one album"},
      {method: "GET", path: "/api/profile", description: "see a profile about me"},
    ]
  })
});

// INDEX
app.get('/api/albums', (req, res) => {
  db.Albums.find({}, (err, albums) => {
    if (err) console.log(`Error at show all albums is: ${err}`);
    res.json(albums);
  })
})

// SHOW (BORKED)
app.get('/api/albums/:id', (req, res) => {
  console.log(req.params)
  albumId = req.params.id;
  db.Albums.findOneAndDelete(albumId, (err, foundAlbum) => {
    if(err){throw err}
    res.json(foundAlbum)
  })
})

// CREATE (BORKED)
app.post('/api/albums/', (req, res) => {
  console.log(req.body)
  newAlbum = new db.Albums({
    name: req.body.name,
    band: req.body.band,
    rating: req.body.rating,
  })
  newAlbum.save((err, newAlbumAdded) => {
    if (err) {throw err}
    res.json(newAlbumAdded)
  });
})

// UPDATE (BORKED)
app.put('/api/albums/:id',(req,res) => {
  console.log('Updating Album:', req.params);
  console.log(req.body);
  const albumId = req.params.id;
  db.albums.findOneAndUpdate(albumId, (err, updateAlbum) => {
      if(err) {throw err;}
      res.json(updateAlbum);
    });
});

// DELETE WORKS
app.delete('/api/albums/:id', (req, res) =>{
  const albumId = req.params.id;
  console.log('delete album', albumId);
  db.Albums.findOneAndDelete(albumId, (err, deletedAlbum) => {
    if(err) { throw err; }
    res.json(deletedAlbum);
  });
});




// PROFILE
app.get('/api/profile', (req, res) => {
  res.send({
    name: "Matt Freeland",
    github: "WalrusMaximus",
    favorite_thing: "Heavy Metal",
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
