import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is Required']
    },
    email:{
        type:String,
        required: [true, 'Email is Required']
    },
    password:{
        type: String,
        required:[true, 'Password is Required']
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    address:{
        type: String,
        default: null
    },
    contact:{
        type: String,
        default: null
    }
}, {timestamps:true}
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
