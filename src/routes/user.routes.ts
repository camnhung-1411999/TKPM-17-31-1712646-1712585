import userController from '../controllers/user.controller';
import validation from '../utils/validation';
import check from '../utils/auth';

import express = require('express');
// import joi = require('joi');

const router = express.Router();
// listUser
router.get(
  '/',
  userController.list
);
router.put(
  '/profiles/:username',
  validation.edit,
  userController.update,
);
router.get(
  '/:username',
  userController.find,
);
router.post(
  '/',
  validation.user,
  check.User,
  userController.create,
);

router.put(
  '/accounts/:username',
  validation.editPassword,
  check.account,
  userController.update,
);
router.delete(
  '/:username',
  userController.delete,
);
export default router;
