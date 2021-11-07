const Article = require('../db').models.article;

module.exports.news = async (req, res) => {
    try {
      const result = await Article.findAll();
      res.json({success: true, data: result});
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};

module.exports.createNews = async (req, res) => {
    try {
      const user = req.user;
      const { title, text } = req.body;
      
      const data = {
        title,
        text,
        user: {
          firstName: user.dataValues.firstName,
          id: user.dataValues.id,
          image: user.dataValues.image,
          middleName: user.dataValues.middleName,
          surName: user.dataValues.surName,
          username: user.dataValues.username,
        },
      };
  
      const result = await Article.create(data);
      res.json({result: true, data: result});
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};

module.exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
   
    const data = {
      title,
      text
    }

    const result = await Article.update(data, {where: {id: id}});

    res.json({result: true, data: result});

  } catch (err) {
    console.error(err);
      res.json({result: false, err});
  }
};

module.exports.deleteNews = async (req, res) => {
    try {
      const {id} = req.params;
        const result = await Article.destroy({where: {id}});
      res.json({result: true, data: result});
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};