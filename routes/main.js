var express = require('express');

var utils = require('../utils');

var router = express.Router();


//All routes other then related to authentication go in this file.
/**
 * Render the home page.
 */
router.get('/', function(req, res) {
  //res.render('index.jade');
});

/**
 * Render the dashboard page.
 */
router.get('/dashboard', utils.requireLogin, function(req, res) {
	console.log('dashboard reached');
	res.json(1);
  //res.render('dashboard.jade');
});
/**
 * Render the search page.
 */
 router.get('/search', function(req, res) {
 	
var databaseUrl = "mongodb://localhost:27017/ngoconnect1"; // "username:password@example.com/mydb"
var collections = ["ngoopportunity"]
var db = require("mongojs").connect(databaseUrl, collections);
	console.log();
	
	var query1="/";
	var query2="/";
	var query3="/";

	if(req.query.ngoname){
        query1 += req.query.ngoname;
        query1 += "/}";
	}
	else{query1 ="{$exists: true}";}

	if(req.query.ngolocation){
        query2 += req.query.ngolocation;
	    query2 += "/";
    }
    else{query2 ="{$exists: true}";}
	if(req.query.cause){
     query3 += req.query.cause;
     query3 += "/";
	}
	else{query3 ="{$exists: true}";}

	
	/*db.ngoopportunity.find().toArray(function(err, documents) {
       if (err) {console.log(err);}
       else{
       	//res.json(documents);
       	}
      });*/
	
	console.log(query1);
	
		db.ngoopportunity.find({$and:[{'ngo.name':/live/},{'location.name':query2},{'cause.name':query3}]}).toArray(function(err, documents) {
       if (err) {console.log(err);}
       else{
       	//console.log(query);
       	console.log(documents);
       	res.json(documents);
       	console.log('dashboard reached');
       	}  	
      });
	console.log('da');

  //res.render('dashboard.jade');
});


router.post('/createopportunity', utils.requireLogin, function(req, res){
	var ngoOpportunity = new models.NGO_Opportunity({
        name:                 req.body.name,
		location:             req.body.location,
		description:          req.body.description,
		cause: 				  req.body.cause,
		required_skills:      req.body.required_skills,
		//date_created needs to be added here.
		compensation: 		  req.body.compensation,
		description:          req.body.description,
		contact:              req.body.contact,
		contact_person:       req.body.contact_person,
		website:              req.body.website
    });

    user.save(function(err) {
        if (err) {
          var error = 'Something bad happened! Please try again.';
          if (err.code === 11000) {
            error = 'That email is already taken, please try another.';
            res.json({"res_code":4005});
          } else { 
            res.json({"res_code":4006, "error":err})
          }
        }

	});

});

module.exports = router;


