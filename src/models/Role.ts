import {Schema, model} from 'mongoose'

export const ROLES = ["user", "admin", "moderator"];
const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
}, {
    versionKey: false
});

export default model('Role', roleSchema);