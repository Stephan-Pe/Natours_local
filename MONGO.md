# Usining Mongodb

- start server: mongod.exe
- start CRUD on commandline: mongo

## Create database

- use databasename

### create collections

- db.databasename.insertMany([{ key: "property value", anotherKey: "another value"}, {.....}])

### update collections

- db.databasename.updateMany({price: {$gt: 500}, rating: {$gte: 4.8}}, {$set: { premium: true }})

### query collections

- db.databasename.find({ $or: [ {price: {$gt: 500}}, { rating: {$gte: 4.8}}] }, {name: 1})

### delete collections

- db.databasename.deleteMany({ key: "value"})

### find read collections

- db.databasename.find()

- db.databasename.find({ conditions })

### local connection

- DATABASE_LOCAL=mongodb://localhost:27017/databasename

## troubleshooter

- stop server from commandline netstat -ano | findstr <portnumber>

- taskkill /F /PID <PIDofPort>

## ReadFiles

- const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

### Middleware checkid function

exports.checkID = (req, res, next, val) => {
console.log(`Tour id is: ${val}`);
if (req.params.id \* 1 > tours.length) {
return res.status(404).json({
status: 'fail',
message: 'invalid ID',
});
}
next();
};

- and pass it in controller

router.param('id', tourController.checkID);

### IMPORT FROM JSON OR DELETE DEV DATA ON DB

- import-dev-data.js
- node dev-data/data/import-dev-data.js --import
- node dev-data/data/import-dev-data.js --delete

### Tour controller v1

//https://mongoosejs.com/docs/api/query.html
//First build query before executing so it's possible to chain methods to it later
//1a) Basic Filter

const queryObj = { ...req.query };
const excludedFields = ['page', 'sort', 'limit', 'fields'];
excludedFields.forEach((field) => {
delete queryObj[field];
});
//1b) Advanced Filters
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//regex recognizes mongoose methods to add $ with replace
//mongoose methods without dollarsign gte, gt, lte, lt
//127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&sort=1&limit=10
//{ duration: { gte: '5' }, difficulty: 'easy', sort: '1', limit: '10' }
//{ duration: { '$gte': '5' }, difficulty: 'easy' }

let query = Tour.find(JSON.parse(queryStr)); 2) Sort function

if (req.query.sort) {
const sortBy = req.query.sort.split(',').join(' ');
query = query.sort(sortBy);
} else {
query = query.sort('-createdAt');
} 
// 3) field limiting

if (req.query.fields) {
const fields = req.query.fields.split(',').join(' ');
query = query.select(fields);
} else {
query = query.select('-\_\_v');
} 4) Pagination
const page = req.query.page _ 1 || 1;
const limit = req.query.limit _ 1 || 100;
const skip = (page - 1) \* limit;
// show 2nd pagination of always 10 results , 1-10, 11-20, etc.
// 127.0.0.1:3000/api/v1/tours?page=2&limit=10
query = query.skip(skip).limit(limit);

if (req.query.page) {
const numTours = await Tour.countDocuments();
if (skip >= numTours) throw new Error('This page does not exist');
}
