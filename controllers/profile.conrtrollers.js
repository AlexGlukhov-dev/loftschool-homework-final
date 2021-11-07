const User = require('../db').models.user;

module.exports.profile = async (req, res) => {
    try {
      const user = req.user;
      
      const responseData = {
        id: user._id,
        username: user.username,
        surName: user.surName,
        firstName: user.firstName,
        middleName: user.middleName,
        permission: user.permission,
        image: user.image,
      };
      res.json({...responseData});
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Что-то пошло не так' });
    }
};

module.exports.updateProfile = async (req, res) => {
  try {
    
    user = req.user;
    const id = user.dataValues.id

    const oldPassword = req.body.oldPassword;

    const userCur = await User.findOne({
      where: {
        id: id
      }
    });
    
    if (userCur.dataValues.password === oldPassword){

      const data = {
        surName: req.body.surName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        password: req.body.newPassword,
      };

      const result = await User.update(data, {where: {id: id}});

      res.json({result: true, data: data});
    } else {
      const result = 'Пароли не совпадают!';
      res.json({result: true, data: result});
    }  

  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};