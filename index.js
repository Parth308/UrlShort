const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { restricToLoggedinUserOnly, checkAuth } = require('./middlewares/auth');

const { connectDb } = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDb('mongodb://0.0.0.0:27017/short-url').then(() =>
	console.log('mongoDb connected')
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/url', restricToLoggedinUserOnly, urlRoute);
app.use('/', checkAuth, staticRouter);
app.use('/user', userRoute);

app.get('/api/:shortId', async (req, res) => {
	const shortId = req.params.shortId;

	const entry = await URL.findOneAndUpdate(
		{
			shortId,
		},
		{
			$push: {
				visitHistory: {
					timestamp: Date.now(),
				},
			},
		}
	);
	res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
	console.log('Server running');
});
