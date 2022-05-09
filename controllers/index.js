const Contact = require('../models/contacts');
const ContactController = {};

ContactController.findAll = async (req, res) => {
    const result = await Contact.find().lean();
    res.render('list', {
        contacts : result
    });
};

ContactController.save = async (req, res) => {
    const newContact = {
        name: req.body.name,
        phone: req.body.phone,
       birthday: req.body.birthday
    }

    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ msg: 'Please include name and email' });
    }

    const contact = new Contact(newContact);
    await contact.save();
    const result = await Contact.find().lean();
    res.render('list', {
        contacts : result
    });
};

async function update(req, res) {
    Contact.updateOne({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) 
        { 
            res.redirect('layouts/main'); 
        }
        else { 
                console.log('Error during record edit : ' + err);
        }
    });
};

async function deleteById(req, res) {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/conts/list');
        }
        else {
            console.log('Error in contact remove :' + err);
        }
    });
};

module.exports = ContactController;