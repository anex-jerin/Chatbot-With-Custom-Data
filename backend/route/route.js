import express from 'express';

import { getQueryResult } from '../controller/query.js';

const router = express.Router();

// router.get('/getQueryResult', (req, res) => {
//   const { query } = req.body;
//   console.log(query);
//   res.send('hello');
// });
router.post('/getQueryResult', getQueryResult);

export default router;
