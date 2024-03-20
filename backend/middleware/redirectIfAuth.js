/* Redirect if auth */

module.exports = (req, res, next)=>{
    if(req.session.userId){
        console.log("You already have auth ", req.session.userId);
        return res.redirect('/activity');
    }
    next();
}