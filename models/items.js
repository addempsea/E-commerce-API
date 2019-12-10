const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    contact: {type: String, required: true},
    image_url: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
});

postSchema.statics = {
   addItem(args, user) {
       return this.create({
           ...args,
           user,
       });
   },
   list({}) {
       return this.find({})
       .populate('user')
   }
}

module.exports = mongoose.model('items', postSchema);