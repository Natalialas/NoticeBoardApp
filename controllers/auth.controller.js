const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const Session = require("../models/Session.model");
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.register = async (req, res) => {
    
  try {
    const { login, password, phoneNumber } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    
    if (login && typeof login === 'string' && password && typeof password === 'string' && phoneNumber && req.file && ["image/png", "image/jpeg", "image/gif"].includes(fileType)) {

        const userWithLogin = await User.findOne({ login });
        if (userWithLogin) {
          fs.unlinkSync(`public/uploads/${req.file.filename}`);
          return res.status(409).send({ message: 'User with this login already exists' });
        }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phoneNumber });
      res.status(201).send({ message: 'User create '+ user.login});
      } else {
        res.status(400).send({ message: 'Bad request'});
        fs.unlinkSync(`public/uploads/${req.file.filename}`);
      }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.login = async (req, res) => {
    try {
      const { login, password } = req.body;
  
      if ( login && typeof login === 'string' && password && typeof password === 'string') {
        const user = await User.findOne({ login });

        if (!user) {
            res.status(400).send({ message: 'Login or password are incorrect'});
        }
        else {
            if (bcrypt.compareSync(password, user.password)) {
              req.session.user = { login: user.login, id: user._id };
              res.status(200).json(req.session.user);
            }
            else {
              res.status(400).send({ message: 'Login or password are incorrect'});
            }
        }    
      } else {
        res.status(400).send({ message: 'Bad request' });
      }
    } catch (error) {
      res.status(500).send({ message: err.message });
    }
};

exports.getUser = async (req, res) => {
  try {
    if (req.session.user && req.session.user.id) {
      const user = await User.findById(req.session.user.id);
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res.status(401).json({ message: "User not authenticated" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    try {
      await Session.deleteMany({});
      res.status(200).send({ message: "Logout successful" });
    } catch (err) {
      res.status(401).send({ message: err });
    }
  } else {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).send({ message: "Error during logout" });
        } else {
          res.status(200).send({ message: "Logout successful" });
        }
      });
    } else {
      res.status(401).send({ message: "You are not logged in" });
    }
  }
};