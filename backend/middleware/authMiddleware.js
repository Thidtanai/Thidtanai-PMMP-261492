/* For check user has already login.
 * Use this for the page you need user to logged in before.
*/

const userSchema = require('../models/User');

module.exports = async(req, res, next)=>{
    try{
        let foundUser = await userSchema.findById(req.session.userId);
        if(!foundUser){
            return res.redirect('/user');
        }
        console.log('User logged in successfully');
        next();
    } catch(error){
        return next(error);
    }
}