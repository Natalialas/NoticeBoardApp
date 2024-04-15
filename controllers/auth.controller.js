const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    
  try {
    const { login, password, phoneNumber  } = req.body;
    
    if (login && typeof login === 'string' && password && typeof password === 'string' && phoneNumber && typeof phoneNumber === 'string') {
        const userWithLogin = await User.findOne({ login });
        if (userWithLogin) {
            return res.status(409).send({ message: 'User with this login already exists' });
        }

    const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phoneNumber });
    res.status(201).send({ message: 'User create '+ user.login});
    } else {
        res.status(400).send({ message: 'Bad request'});
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
                res.status(200).send({ message: 'Login successful' });
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