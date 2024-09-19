import Express from 'express';
import { Stripe } from 'stripe';
import {v4 as uuidv4}from 'uuid';
import orderModel from '../model/orderModel.js';

const router = Express.Router();
const stripe = new Stripe('sk_test_51PkS9LRwRCQ405Pc5fzNEUKSRWlbqHsh8XVLIWxAJwIXLHbumziw6BikT8XQEycoXwky6kxIaI7CemPrIseNBVFU00GtNrJFh1')

router.post('/placeorder', async (req,res)=>{
    const {token,total,currentUser,cartItems} = req.body;
    try{
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const payment = await stripe.charges.create({
            amount: total*100,
            currency:'inr',
            customer: customer.id,
            receipt_email: token.email
        },{
            idempotencyKey: uuidv4()
        })
        if(payment){
            const newOrder = new orderModel({
                name:currentUser.name,
                email:currentUser.email,
                userid:currentUser._id,
                orderItems: cartItems,
                orderAmount: total,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                transactionId: payment.source.id

            })
            newOrder.save();
            res.send('Payment Success');
        }
        else{
            res.send("Payment Failed.");
        }
    }
    catch(err){
        res.status(400).json({
            message: "Something is Not Right"
        })
        
    }
})

router.post('/getuserorder', async(req,res)=>{
    const {userid}  = req.body;
    try{
        const orders = await orderModel.find({userid})
        res.status(200).send(orders);
    }catch(err){
        res.status(400).json({
            message:'Something went Order',
            error: err.stack
        })
    }
})

router.get('/getallorders', async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.status(200).send(orders)
    }
    catch(error){
        res.json({message:error});
    }
})

router.post('/deliveraorder', async(req,res)=>{
    const {orderId} = req.body;
    console.log("Backend " + orderId);
    try{
        const order = await orderModel.findOne({_id:orderId});
        order.isDelivered = true;
        await order.save();
        res.status(200).send('Order Delivered Successfully...');
    }
    catch(error){
        res.status(404);
        res.json({message:error});
    }
})

export default router;