import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Order Name Required...']
    },
    email: {
        type: String,
        required: [true, 'Email is Required...']
    },
    userid: {
        type: String,
        required: true
    },
    orderItems: [],
    shippingAddress: {
        type: Object
    },
    orderAmount: {
        type: String,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default:false
    },
    transactionId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const orderModel = mongoose.model('order', orderSchema);
export default orderModel;