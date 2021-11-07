const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controllers');
const AuthController = require('../controllers/auth.controllers');
const ProfileController = require('../controllers/profile.conrtrollers');
const NewsConrtroller = require('../controllers/news.conrtrollers');

const AuthMiddleware = require('../middleware/auth.middleware');
const TokenMiddleware = require('../middleware/token.middleware');

router.get('/users/', TokenMiddleware.isAuth, UserController.users);
router.delete('/users/:id', TokenMiddleware.isAuth, UserController.deleteUser);
router.patch('/users/:id/permission/', TokenMiddleware.isAuth, UserController.permissionUser);

router.post('/registration/', AuthMiddleware.regisration, AuthController.registration);
router.post('/login/', AuthMiddleware.login, AuthController.login);
router.post('/refresh-token/', AuthController.refreshToken);

router.get('/profile/', TokenMiddleware.isAuth, ProfileController.profile);
router.patch('/profile', TokenMiddleware.isAuth, ProfileController.updateProfile);

router.get('/news/', TokenMiddleware.isAuth, NewsConrtroller.news);
router.post('/news/', TokenMiddleware.isAuth, NewsConrtroller.createNews);
router.patch('/news/:id', TokenMiddleware.isAuth, NewsConrtroller.updateNews);
router.delete('/news/:id', TokenMiddleware.isAuth, NewsConrtroller.deleteNews);

module.exports = router;