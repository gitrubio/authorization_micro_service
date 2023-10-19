import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';
import {IUser} from '../interfaces/user.interface';
import STATUS_CODES from '../constants';
import Role from '../models/Role';

export const signUp = async (req: Request, res: Response) => {
     try {
        const { username, email, password, roles } = req.body as IUser;

        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: 'user' });
            if (role) newUser.roles = [role._id];
        }
        const saveUser = await newUser.save();

        const token = jwt.sign({ id: saveUser._id}, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })
        res.status(STATUS_CODES.CREATED).json({ token });
    } catch (error) {
        console.log(error);
        
        res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send('Error creating user');
    } 
}

export const signIn = async (req: Request, res: Response) => {
    try {
    
        const userFound = await User.findOne({ email: req.body.email }).populate('roles');
        
        if (!userFound) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });

       const matchPassword =  await User.comparePassword(req.body.password, userFound.password);

        if(!matchPassword) return res.status(STATUS_CODES.UNAUTHORIZED).json({ token: null, message: 'Invalid password' });

        const token = jwt.sign({ id: userFound._id}, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })
        res.status(STATUS_CODES.OK).json({ token });

    } catch (error) {
        res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send('Error creating user');
    }
}