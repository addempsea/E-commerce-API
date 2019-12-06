const item = require("../models/items");

const add = async (req, res, next) => {
    
        try {
            const { name, price, contact, image_url } = req.body;
            const newItem = new item({
                name,
                price,
                contact,
                image_url
            });
    
            await newItem.save();
            return res.status(201).json({
                message: "Advert created, return to Homepage to see "
            })
    
        } catch (err) {
            return next(err)
        }
    
    

}

const items = async (req, res, next) => {

    try {
        const data = await item.find({}).sort({ createdAt: -1 });
        if (!data) {
            return res.status(404).json({
                message: "No item found"
            });
        } else {
            return res.status(200).json({ data })
        }

    } catch (err) {
        return next(err)
    }

}

const itemOne = async (req, res, next) => {
    const id = req.params.id

    try {
        const data = await item.findOne({ _id: id });
        if (!data) {
            return res.status(404).json({
                message: "Item not found"
            })
        } else {
            res.status(200).json({ data })
        }

    } catch (err) {
        return next(err);
    }
}


const edit = async (req, res, next) => {


    try {
        const id = req.params.id
        const { name, price, contact, image_url } = req.body

        const data = await item.findOneAndUpdate({ _id: id }, {$set: {name: name, price: price, contact: contact, image_url: image_url}}, {new:true})
        if (!data) {
            return res.status(404).json({
                message: "Item not found"
            })

        } else {
            
            const editedItem = await data.save();
            return res.send(editedItem);
        }

    } catch (err) {
        return next(err);
    }

}

const removed = async (req, res, next) => {
    try {
        const id = req.params.id;
        await item.remove({ _id: id });
        return res.status(200).json({
            message: "item deleted successfully"
        });

    } catch (err) {
        return next(err)
    }


}

module.exports = { add, items, itemOne, edit, removed }