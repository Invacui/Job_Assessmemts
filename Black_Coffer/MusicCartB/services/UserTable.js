const Users = require("../models/Users")
const bcrypt = require("bcrypt");
//services
const UserLoginService = async (vdata, password, vdataType) => {
    try {
        let query = {};
        if (vdataType === 'phone') {
            // If the provided data contains '@', treat it as an email
            if (vdata.includes('@')) {
                query['email'] = vdata;
            } else {
                query['phone'] = vdata;
            }
        } else if (vdataType === 'email') {
            query['email'] = vdata;
        } else {
            throw new Error('Invalid data type specified.');
        }

        const validUserData = await Users.findOne(query);

        if (validUserData) {
            const passCheck = await bcrypt.compare(password, validUserData.password);
            if (passCheck) {
                return validUserData;
            } else {
                throw new Error('Password is incorrect. Please check again.');
            }
        } else {
            throw new Error('User does not exist with this data.');
        }
    } catch (error) {
        console.error(`Error checking conditions: ${error.message}`);
        throw new Error(error.message);
    }
};


 


module.exports = {UserLoginService};