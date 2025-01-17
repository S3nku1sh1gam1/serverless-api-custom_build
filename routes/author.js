const express = require('express');
const AuthorModel = require('../models/author');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getAuthor, (req, res) => {
    res.json(res.author);
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.age){
            return res.status(400).json({ message: 'Name and age are required' });
        }

        const existingAuthor = await AuthorModel.findOne({ name: req.body.name });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author already exists'});
        }

        const author = new AuthorModel(req.body);
        const newAuthor = await author.save();
        res
          .status(201)
          .json({message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.patch('/id', getAuthor, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.author.name = req.body.name;
        }
        const updatedAuthor = await res.author.save();
        res.status(400).json({ message: err.message });
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', getAuthor, async (req, res) => {
    try {
        const updatedAuthor = await AuthorModel.findIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        res.json(updatedAuthor);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getAuthor, async (req, res) => {
    try {
        await AuthorMode.findIdAndDelete(req.params.id);
        res.json({ message: 'Author delete'});
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});

async function getAuthor(req, res, next) {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.author = author;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

MediaSourceHandle.exports = router;