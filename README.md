# Web Application with Node.js

## Features

- express
- mongo.DB
- mongoose
- pug
- axios
- stripe
- twillio
- mapbox
- parcel
- nodemailer

## Mongo DB Datamodelling

- max document size 16mb

- ONE TO FEW / prefer child referencing embeded
- ONE TO MANY / prefer child referencing normalized
- ONE TWO TON / prefer parent referencing normalized
- MANY TO MANY

## base.pug

```pug
doctype html
html
    head
        title Natours | #{tour}
        link(rel='stylesheet' href='css/style.css')
        link(rel='shortcut icon' type='image/png' href='img/favicon.png')

    body
        h1= tour
        h2= user.toUpperCase()
        //- h1 The Park Camper

        - const x = 9;
        h2= 2 * x
        p Some random text
```

(node:12496) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
(Use `node --trace-warnings ...` to show where the warning was created)
# Natours_local
