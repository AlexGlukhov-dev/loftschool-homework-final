const passport = require('passport');
const LocalStrategy = require("passport-local");
const { tokensGenerate, tokenGetPayload } = require('../helpers/tokens.helpers');

const User = require('../db').models.user;

const getUserbyID = async function (id) {
  const user = await User.findOne({
    where: {
      id: id
    }
  });

  return user.dataValues;
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  const user = await getUserbyID(id);
  const _user = user.id === id ? user : false;
  done(null, _user);
});

passport.use(new LocalStrategy({ usernameField: "username" }, async (userName, password, done) => {

  const _user = await User.findOne({
    where: {
      userName: userName
    }
  });

  const user = _user.dataValues;
  
  if(userName === user.userName && password === user.password){
    return done(null, user);
  }else{
    return done(null, false);
  }
  
}));

module.exports.registration = async (req, res) => {
    try {
      const { username, surName, firstName, middleName, password } = req.body;
      
      const permission = {
        chat: { C: true, R: true, U: true, D: true },
        news: { C: true, R: true, U: true, D: true },
        settings: { C: true, R: true, U: true, D: true }
      };

      const newUser = {
        userName: username,
        surName,
        firstName,
        middleName,
        password,
        permission,
      };
  
      const user = await User.create(newUser);
      const tokens = tokensGenerate(user.dataValues);
     
      const responseData = {
        id: user.id,
        image: user.image,
        username,
        surName,
        firstName,
        middleName,
         ...tokens,
        permission,
      };
  
      res.json({...responseData});
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};

module.exports.login = async (req, res, next) => {
    try {
      const { username } = req.body;
  
      const _user = await User.findOne({
        where: {
          userName: username
        }
      });
      const user = _user.dataValues;

      passport.authenticate("local", (err, user) => {
        if(err){
          return next(err)
        }
        req.login(user, () => {  

          const tokens = tokensGenerate(user);  

          const responseData = {
            id: user.id,
            image: user.image,
            username: user.userName,
            surName: user.surName,
            firstName: user.firstName,
            middleName: user.middleName,
            ...tokens,
            permission: user.permission,
          };  

          res.json({...responseData});
        })
      })(req, res, next);
  
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};

module.exports.refreshToken = async (req, res) => {
    try {
      const token = req.headers.authorization;
      const payload = tokenGetPayload(token);
      const user = await User.findOne({ _id: payload.id });
      const tokens = tokensGenerate(user);
  
      res.json({result: true, data: tokens});
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};