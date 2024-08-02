import express from 'express';
import router from './task4.routes';
const routes = express.Router();
 
routes.use('/', router)

export default routes;