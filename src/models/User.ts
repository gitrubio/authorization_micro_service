import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser, UserModel } from '../interfaces/user.interface';

const userSchema = new Schema<IUser,UserModel>({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: [
        {
            ref: 'Role',
            type: Schema.Types.ObjectId
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});
userSchema.static('encryptPassword', async (password: string) => {
        return await bcrypt.hash(password, 10);
})
userSchema.static('comparePassword', async (password: string, receivedPassword: string) => {
    return await bcrypt.compare(password, receivedPassword);
})

export default model<IUser,UserModel>('User', userSchema);