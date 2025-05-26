const { User } = require("../models");
const bcrypt = require("../providers/bcrypt.provider");
const jwt = require("../providers/jwt.provider");
const userProvider = require("../providers/users.providers");

const createUser = async ({ name, email, password, role, position }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hashPassword(password);

  const newUser = await userProvider.createUserInDB({
    name,
    email,
    password: hashedPassword,
    role,
    position,
  });
  const token = jwt.generateToken({
    id: newUser.id,
    name: newUser.name,
    role: newUser.role,
  });
  return {
    message: "Usuario registrado correctamente",
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      position: newUser.position,
    },
  };
};

module.exports = { createUser };
