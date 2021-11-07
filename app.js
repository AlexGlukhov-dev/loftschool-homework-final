const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { socketServer } = require('./services/socket.service');
const path = require('path');
const passport = require("passport");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', express.static(path.join(__dirname, 'build')));

app.use(
	session({
		store: new FileStore(),
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const server = require('http').Server(app);

const io = require("socket.io")(server, {
	allowEIO3: true,
});

io.on('connection', socketServer);

app.use(logger('dev'));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', require(path.join(__dirname, 'api')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

server.listen(PORT, function () {
	console.log(`App listening on port ${PORT}!`);
});