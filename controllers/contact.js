const Contact = require('../models/contacts');

async function findAll(req, res) {
    const result = await Contact.find();
    res.json(result);
};

async function findById(req, res) {
    const exist = await Contact.findById(req.params.id);

    if (exist) {
        res.json({ contact: exist });
    } else {
        res.status(400).json({ msg: `No contact with the id ${req.params.id}`});
    }
};

async function findByPhone(req, res) {
    const exist = await Contact.find({phone: req.params.phone});

    if (exist) {
        res.json({ contact: exist });
    } else {
        res.status(400).json({ msg: `No contact with the phone ${req.params.phone}`});
    }
};

async function save(req, res) {
    const newContact = {
        name: req.body.name,
        phone: req.body.phone,
        birthday: req.body.birthday
    }

    if (!req.body.name || !req.body.phone) {
        return res.status(400).json({ msg: 'Please include name and email' });
    }

    const contact = new Contact(newContact);
    const result = await contact.save();
    res.status(201).json({ msg: 'Contact created', contact: result});
};

async function update(req, res) {
    const exist = await Contact.findById(req.params.id);

    if (exist) {
        await Contact.findOneAndUpdate({
            _id: req.params.id
        }, req.body);
        res.status(201).json({ msg: 'Contact updated', contact: await Contact.findById(req.params.id)});
    } else {
        res.status(400).json({ msg: `No contact with the id ${req.params.id}`});
    }
};

async function deleteById(req, res) {
    const exist = await Contact.findById(req.params.id);

    if (exist) {
        await Contact.deleteMany({_id: req.params.id});
        res.json( { msg: 'Contact deleted', contacts: await Contact.find() });
    } else {
        res.status(400).json({ msg: `No contact with the id ${req.params.id}`});
    }
};

async function deleteByPhone(req, res) {
    const exist = await Contact.find({phone: req.params.phone});
    console.log(exist);
    if (exist.length > 0) {
        await Contact.deleteMany({phone: req.params.phone});
        res.json( { msg: 'Contact deleted', contacts: await Contact.find() });
    } else {
        res.status(400).json({ msg: `No contact with email ${req.params.phone}`});
    }
};

module.exports = {findAll, findById, findByPhone, save, update, deleteById, deleteByPhone};
