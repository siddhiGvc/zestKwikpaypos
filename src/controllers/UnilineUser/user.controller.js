import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import { UnilineUsers } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';


export const allUnilineUsers = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const Users = await UnilineUsers.findAndCountAll({
      order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { Users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const get = async (req, res) => {
  try {
    const Users = await UnilineUsers.findAll();
    return successResponse(req, res, { Users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const {
      email, password, firstName, lastName,
    } = req.body;
    if (process.env.IS_GOOGLE_AUTH_ENABLE === 'true') {
      if (!req.body.code) {
        throw new Error('code must be defined');
      }
      const { code } = req.body;
      const customUrl = `${process.env.GOOGLE_CAPTCHA_URL}?secret=${process.env.GOOGLE_CAPTCHA_SECRET_SERVER
        }&response=${code}`;
      const response = await axios({
        method: 'post',
        url: customUrl,
        data: {
          secret: process.env.GOOGLE_CAPTCHA_SECRET_SERVER,
          response: code,
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      });
      if (!(response && response.data && response.data.success === true)) {
        throw new Error('Google captcha is not valid');
      }
    }

    const Users = await UnilineUsers.scope('withSecretColumns').findOne({
      where: { email },
    });
    if (Users) {
      throw new Error('UnilineUsers already exists with same email');
    }
    const reqPass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
    const payload = {
      email,
      firstName,
      lastName,
      password: reqPass,
      isVerified: false,
      verifyToken: uniqueId(),
    };

    const newUnilineUsers = await UnilineUsers.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const user = await UnilineUsers.scope('withSecretColumns').findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error('Incorrect Email Id/Password');
    }
    const reqPass = crypto
      .createHash('sha256')
      .update(req.body.password || '')
      .digest('hex');
  //  console.log(reqPass);
    if (reqPass!== user.password) {
      throw new Error('Incorrect Email Id/Password');
    }
    const token = jwt.sign(
      {
        UnilineUsers: {
          UserId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET,
    );
   
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
  
    return errorResponse(req, res, error.message);
  }
};

export const tokenLogin = async (req, res) => {
  try {
    const UnilineUsers = await UnilineUsers.scope('withSecretColumns').findOne({
      where: { verifyToken: req.query.token },
    });
    if (!UnilineUsers) {
      throw new Error('Incorrect Token');
    }
    const token = jwt.sign(
      {
        UnilineUsers: {
          UnilineUsersId: UnilineUsers.id,
          email: UnilineUsers.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET,
    );
    delete UnilineUsers.dataValues.password;
    return successResponse(req, res, { UnilineUsers, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const profile = async (req, res) => {
  try {
    const { UnilineUsersId } = req.UnilineUsers;
    const UnilineUsers = await UnilineUsers.findOne({ where: { id: UnilineUsersId } });
    return successResponse(req, res, { UnilineUsers });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { UnilineUsersId } = req.UnilineUsers;
    const UnilineUsers = await UnilineUsers.scope('withSecretColumns').findOne({
      where: { id: UnilineUsersId },
    });

    const reqPass = crypto
      .createHash('md5')
      .update(req.body.oldPassword)
      .digest('hex');
    if (reqPass !== UnilineUsers.password) {
      throw new Error('Old password is incorrect');
    }

    const newPass = crypto
      .createHash('md5')
      .update(req.body.newPassword)
      .digest('hex');

    await UnilineUsers.update({ password: newPass }, { where: { id: UnilineUsers.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const changeUnilineUsersPassword = async (req, res) => {
  try {
    const { id } = req.body;
    const Users = await UnilineUsers.scope('withSecretColumns').findOne({
      where: { id: id },
    });

    const newPass = crypto
      .createHash('sha256')
      .update(req.body.password)
      .digest('hex');

    await UnilineUsers.update({ password: newPass }, { where: { id: Users.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const saveUnilineUsers = async (req, res) => {
  try {
    const {
      email, password, name, city, zone, ward, beat, isAdmin, clientName
    } = req.body;
   
    const user = await UnilineUsers.scope('withSecretColumns').findOne({
      where: { email },
    });
    if (user) {
      throw new Error('UnilineUsers already exists with same UnilineUsersname');
    }
    const reqPass = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    const payload = {
      email,
      name,
      City:city,
      Zone:zone,
      Ward:ward,
      Beat:beat,
      isAdmin,
      clientName,
      password: reqPass,
      isVerified: true,
    };

    const newUnilineUsers = await UnilineUsers.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
   
    return errorResponse(req, res, error.message);
  }
};

export const deleteUnilineUsers = async (req, res) => {
  try {
    const Users = await UnilineUsers.scope('withSecretColumns').findOne({
      where: { id: req.query.id },
    });
    if (!Users) {
      throw new Error(`UnilineUsers doesn't exist`);
    }

    await UnilineUsers.destroy({ where: { id: req.query.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
