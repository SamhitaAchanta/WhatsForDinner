var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display recipe page
router.get('/', function(req, res, next) {      
    dbConn.query('SELECT * FROM ingredient ',function(err,rows) {
        if(err) {
            req.flash('error', err);
            // render to views/ingredients/index.ejs
            res.render('ingredients',{data:''});   
        } else {
            // render to views/ingredients/index.ejs
            res.render('ingredients',{data:rows});
        }
    });
});

// display add recipe page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('ingredients/add', {
        recipeName: '',
        ingredient1: '',
        ingredient2:'',
        ingredient3: ''
    })
})

// add a new recipe
router.post('/add', function(req, res, next) {    

    let recipeName = req.body.recipeName;
    let ingredient1 = req.body.ingredient1;
    let ingredient2 = req.body.ingredient2;
    let ingredient3 = req.body.ingredient3;
    let errors = false;

    if(recipeName.length === 0 || ingredient1.length === 0 || ingredient2.length === 0 || ingredient3.length == 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter recipe name and a few ingredients");
        // render to add.ejs with flash message
        res.render('ingredients/add', {
            recipeName: recipeName,
            ingredient1: ingredient1,
            ingredient2:ingredient2,
            ingredient3:ingredient3
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            recipeName: recipeName,
            ingredient1: ingredient1,
            ingredient2:ingredient2,
            ingredient3:ingredient3
        }
        
        // insert query
        dbConn.query('INSERT INTO ingredient SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('ingredients/add', {
                    recipeName: form_data.recipeName,
                    ingredient1: form_data.ingredient1,
                    ingredient2:form_data.ingredient2,
                    ingredient3:form_data.ingredient3
                })
            } else {                
                req.flash('success', 'ingredient successfully added');
                res.redirect('/ingredients');
            }
        })
    }
})

// display edit ingredients page
router.get('/edit/', function(req, res, next) {

    let recipeID = req.params.recipeID;
   
    dbConn.query('SELECT * FROM ingredient WHERE recipeID = ' + recipeID, function(err, rows, fields) {
        if(err) throw err
         
        // if recipe not found
        if (rows.length <= 0) {
            req.flash('error', 'Recipe not found with ID = ' + recipeID)
            res.redirect('/ingredients')
        }
        // if recipe found
        else {
            // render to edit.ejs
            res.render('ingredients/edit', {
                title: 'Edit Recipe', 
                recipeID: rows[0].recipeID,
                recipeName: rows[0].recipeName,
                ingredient1: rows[0].ingredient1,
                ingredient2: rows[0].ingredient2,
                ingredient3: rows[0].ingredient3
            })
        }
    })
})

// update ingredients data
router.post('/update/', function(req, res, next) {

    let id = req.params.id;
    let recipeName = req.body.recipeName;
    let ingredient1 = req.body.ingredient1;
    let ingredient2 = req.body.ingredient2;
    let ingredient3 = req.body.ingredient3;
    let errors = false;

    if(recipeName.length === 0 || ingredient1.length === 0 || ingredient2.length === 0 || ingredient3.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter recipe name and a few ingredients");
        // render to add.ejs with flash message
        res.render('ingredients/edit', {
            id: req.params.id,
            recipeName: recipeName,
            ingredient1: ingredient1,
            ingredient2:ingredient2,
            ingredient3:ingredient3
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            recipeName: recipeName,
            ingredient1: ingredient1,
            ingredient2:ingredient2,
            ingredient3:ingredient3
        }
        // update query
        dbConn.query('UPDATE ingredient SET ? WHERE recipeID = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('ingredients/edit', {
                    id: req.params.id,
                    recipeName: form_data.recipeName,
                    ingredient1: form_data.ingredient1,
                    ingredient2: form_data.ingredient2,
                    ingredient3: form_data.ingredient3
                })
            } else {
                req.flash('success', 'ingredients successfully updated');
                res.redirect('/ingredients');
            }
        })
    }
})
   
// delete recipe
router.get('/delete/', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM ingredient WHERE recipeID = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to ingredients page
            res.redirect('/ingredients')
        } else {
            // set flash message
            req.flash('success', 'ingredients successfully deleted! ID = ' + id)
            // redirect to ingredients page
            res.redirect('/ingredients')
        }
    })
})
module.exports = router;