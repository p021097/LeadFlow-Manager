const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        default: "",
      },
      suite: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      zipcode: {
        type: String,
        default: "",
      },
      geo: {
        lat: {
          type: String,
          default: "",
        },
        lng: {
          type: String,
          default: "",
        },
      },
    },
    company: {
      name: {
        type: String,
        default: "",
      },
      catchPhrase: {
        type: String,
        default: "",
      },
      bs: {
        type: String,
        default: "",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
