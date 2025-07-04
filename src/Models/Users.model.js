import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bccrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    avatar: {
        type: String,
        default: "default-avatar.png",
    },

    profilePicture: {
        type: String,
        default: "default.jpg",
    },
    watchhistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    }],

    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    refreshToken: {
        type: String,
        default: null,
    }, 
}, 
{timestamps: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bccrypt.hash(this.password, 10);
  next();
})

userSchema.methods.ispasswordMatch = async function(enteredPassword) {
    return await bccrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};



export default mongoose.model("User", userSchema);