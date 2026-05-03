const User = require("../models/User");

const normalizePayload = (payload) => ({
  name: payload.name?.trim() || "",
  username: payload.username?.trim() || "",
  email: payload.email?.trim().toLowerCase() || "",
  phone: String(payload.phone || "").trim(),
  website: payload.website?.trim() || "",
  address: {
    street: payload.address?.street?.trim() || "",
    suite: payload.address?.suite?.trim() || "",
    city: payload.address?.city?.trim() || "",
    zipcode: String(payload.address?.zipcode || "").trim(),
    geo: {
      lat: payload.address?.geo?.lat?.trim() || "",
      lng: payload.address?.geo?.lng?.trim() || "",
    },
  },
  company: {
    name: payload.company?.name?.trim() || "",
    catchPhrase: payload.company?.catchPhrase?.trim() || "",
    bs: payload.company?.bs?.trim() || "",
  },
});

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch users.", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const normalizedData = normalizePayload(req.body);

    if (
      !normalizedData.name ||
      !normalizedData.username ||
      !normalizedData.email ||
      !normalizedData.phone ||
      !normalizedData.website
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required user details." });
    }

    const user = await User.create({
      ...normalizedData,
      createdBy: req.user.id,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to create user.", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const normalizedData = normalizePayload(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      normalizedData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to update user.", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to delete user.", error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
