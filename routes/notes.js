const app = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');

app.get('/api/notes', (req, res) => {
      fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
          console.error(err);
        } else {
          res.json(JSON.parse(data));
        }
  });
  });

  app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a notes`); 
    
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      let addNote = req.body;
      addNote.id = uuid();
      notes.push(addNote);
      
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        res.json(notes);
        console.info('New note updated')
      });
    }); 
  });
  
  app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);

      notes.forEach(function(thisNote, i) {              
        if (thisNote.id === req.params.id) {
            notes.splice(i, 1)            
        }
  })
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(notes);
      console.info('Note was deleted')
    });
   });
  });

  module.exports = app;