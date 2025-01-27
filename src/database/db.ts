import mongoose from 'mongoose';
import { mongoURL } from '../configs/config';

mongoose.connect("mongodb+srv://user:user123@cluster1.nsva2.mongodb.net/FoodDelivery");
const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    username : {type : String, required : true , unique : true},
    password : {type : String, required : true},
});

const menuSchema = new mongoose.Schema({
    name : {type : String, required : true},
    category : {type : String, },
    price : {type : Number, required : true},
    availability : {type : Boolean, default : true},
    imageUrl : {type : String, },
    description : {type : String, }});

const orderSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId,ref :"User" , required : true},
    items : [{
        menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    totalAmount : {type : Number, required : true},
    status : {type : String},
})

const User = mongoose.model("User",userSchema);
const Menu = mongoose.model("Menu",menuSchema);
const Order = mongoose.model("Order",orderSchema);

export {User , Menu , Order};
