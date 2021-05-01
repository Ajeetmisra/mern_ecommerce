var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    salt: String,
    session_token: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 0,
    },
    parchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// userSchema
//   .virtual("password") // name of virtual field
//   .set(function (password) {
//     this._password = password;
//     this.__password = password;
//     this.salt = "abcdefg";
//     this.encry_password = this.securepassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });
// userSchema.methods = {
//   authenticate: function (plainpassword) {
//     console.log(
//       "ENCRY_CHECK ",
//       this.securepassword(plainpassword),
//       this.encry_password
//     );
//     // console.log("__PASSWORD", this.__password);
//     // return this.__password === plainpassword;
//     return this.securepassword(plainpassword) === this.encry_password;
//   },
//   securepassword: function (plainpassword) {
//     if (!plainpassword) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(plainpassword)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
// };

module.exports = mongoose.model("User", userSchema);
