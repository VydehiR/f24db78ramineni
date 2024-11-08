const express = require('express');
const router = express.Router();

// Sample data for Sculptures
const results = [
  { Sculptures_name: "The Thinker", Sculptures_height: "182", Sculptures_material: "Bronze" },
  { Sculptures_name: "Venus de Milo", Sculptures_height: "203", Sculptures_material: "Marble" },
  { Sculptures_name: "David", Sculptures_height: "517", Sculptures_material: "Marble" }
];

// Route to render the Sculptures page
router.get('/', (req, res) => {
  res.render('Sculptures', { 
    title: 'Sculptures search results', 
    results: results  
  });
});

module.exports = router;