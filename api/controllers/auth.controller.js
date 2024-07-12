import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = async (req, res) =>
{
    const {firstName, lastName, userName, email, password, phone} = req.body
    const user = await User.findOne({email})
    if(user){
        return res.status(200).json("User Already Exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: userName,
        email: email,
        password: hashPassword,
        phone: phone
    });
    await newUser.save();
    return res.status(200).json("User Registered Successfully!");
}

export const login = async (req, res) =>
{
    try
    {
        const user = await User.findOne({ email: req.body.email })
        if (!user)
        {
            return res.status(404).send("User not found!");
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect)
        {
            return res.status(400).send("Password is incorrect!");
        }
        const token = jwt.sign({ id: user._id},process.env.JWT_SECRET)
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: "Login Success",
                data: user
            })
    } catch (error)
    {
        return res.status(500).send("Something went wrong!");
    }
}