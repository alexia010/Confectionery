import mongoose from 'mongoose';


const userSchema = mongoose.Schema({

    name:{
        type: String,
        required: function() {return this.role !== 'guest'; }
    },
    password:{
        type: String,
        required:  function() {return this.role !== 'guest'; },
        minLength: 6,
    },
    email:{
        type: String,
        required:  function() {return this.role !== 'guest'; },
        unique: true
    },
    phone:{
        type: String,
        required: false,
        sparse: true // allows multiple null values
    },
    adress:
    {
        type: String,
        required: false,
    },
    role:
    {
        type: String,
        enum:['guest','user','cofetar','admin'],
        default: 'user'
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },

    verificationToken:String,
    verificationExpires:Date,

    },
    {timestamps:true}
);

export const User=mongoose.model('User', userSchema);

export default User;