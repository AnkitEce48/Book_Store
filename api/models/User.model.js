import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: false,
            default: "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);