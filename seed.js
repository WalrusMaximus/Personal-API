// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// const db = require('./models');

const db = require('./models');

const album_list = [
    {
        name: "Ashes of the Wake",
        band: "Lamb of God",
        rating: 9
    },
    {
        name: "Aenima",
        band: "Tool",
        rating: 8
    },
    {
        name: "Australasia",
        band: "Pelican",
        rating: 10
    },
    {
        name: "Blizzard of Ozz",
        band: "Ozzy Osbourne",
        rating: 8.5
    },
    {
        name: "Dethklok",
        band: "Dethalbum I",
        rating: 10
    },
    {
        name: "Incredibad",
        band: "The Lonely Island",
        rating: 9
    },
    {
        name: "Desolation",
        band: "Khemmis",
        rating: 10
    },
]


db.Album.deleteMany({}, function(err, albums) {
    console.log('Cleared Album Database');
    db.Album.create(album_list, function(err, albums){
        if (err) { console.log(err) }
            return; 
        });

        album_list.forEach(function (albumData) {
            let album = new db.Album({
                name: albumData.name,
                band: albumData.band,
                rating: albumData.rating,
                    

            })
                
            album.save(function(err,savedAlbum){
                if (err) {throw err}
                console.log(`Added ${savedAlbum} to Albums`); 
            })
        })

    
    });
