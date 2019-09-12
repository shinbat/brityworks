const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, 'uploads');
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname);
			const basename = path.basename(file.originalname, ext);
			done(null, basename + Date.now() + ext);
			// done(null, basename + ext);
		},
	}),
	limit: { fileSize: 20 * 1024 * 1024 },
});

router.post('/files', upload.array('files'), (req, res) => {
	console.log(req.files);
	// req.files = [{ filename: '웃는얼굴20190826.png' }, { filename: '메가폰20190826.png'}];
	res.json(req.files.map(v => v.filename))
});

router.post('/', async (req, res) => {
	try {
		const newData = await db.License.create({
			type: req.body.type,
			quantity: req.body.quantity,
			applyDt: req.body.applyDt,
			issueDt: req.body.issueDt,
			expireDt: req.body.expireDt,
			status: req.body.status,
			applicant: req.body.applicant,
			licenseFile: req.body.licenseFile,
		}); 
		return res.json(newData);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.get('/', async (req, res, next) => {	
	try {
		const licenseList = await db.License.findAll({
			order: [['createdAt', 'DESC']],
		});
		res.json(licenseList);
	} catch (err) {
		console.error(err);
		next(err);
	};
});

module.exports = router; 