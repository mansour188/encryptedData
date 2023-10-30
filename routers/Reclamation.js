const { generateToken, verifyToken } = require('../token');
const userRouter=require('express').Router();
const Reclamation=require('../models/reclamation')
const { checkUserRole } = require('../token');
const reclamationRouter=require('express').Router();
const encryption = require('../crypto/crypto')



reclamationRouter.post('/add/:userId', checkUserRole('USER'), (req, res) => {
    const userId = req.params.userId;
    const reclamationData = {
      title: req.body.title,
      description: req.body.description,
    };
  
    // Encrypt the reclamation data
    const encryptedReclamation = encryption.encrypt(reclamationData);
  
    const newReclamation = new Reclamation({
      userId: userId,
      encryptedData: encryptedReclamation,
      createdAt: new Date(), 
    });
  
    newReclamation
      .save()
      .then(savedReclamation => {
        console.log('Reclamation saved:', savedReclamation);
        res.json(savedReclamation);
      })
      .catch(error => {
        console.error('Error saving reclamation:', error);
        res.status(500).json({ error: 'Failed to save reclamation' });
      });
  });
  reclamationRouter.get('/reclamations',checkUserRole('RESPONSABLE'), (req, res) => {
    Reclamation.find({})
      .exec()
      .then(reclamationData => {
        // Decrypt each reclamation
        const decryptedReclamations = reclamationData.map(reclamation => {
          const decryptedData = encryption.decrypt(reclamation.encryptedData);
          return {
            title: decryptedData.title,
            description: decryptedData.description,
            createdAt: reclamation.createdAt,
          };
        });
  
        res.json(decryptedReclamations);
      })
      .catch(err => {
        console.error('Error fetching reclamation data:', err);
        res.status(500).json({ error: 'Failed to fetch reclamation data' });
      });
  });
reclamationRouter.get('/reclamations/:userId',checkUserRole('USER'), (req, res) => {
    const userId = req.params.userId;
  
    Reclamation.find({ userId: userId })
      .exec()
      .then(reclamationData => {
        
        const decryptedReclamations = reclamationData.map(reclamation => {
          const decryptedData = encryption.decrypt(reclamation.encryptedData);
          return {
            title: decryptedData.title,
            description: decryptedData.description,
            createdAt: reclamation.createdAt,

           
          };
        });
  
        res.json(decryptedReclamations);
      })
      .catch(err => {
        console.error('Error fetching reclamation data:', err);
        res.status(500).json({ error: 'Failed to fetch reclamation data' });
      });
  });
module.exports=reclamationRouter