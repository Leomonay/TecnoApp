const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      autoPopulate: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    lines: [{type: Schema.Types.ObjectId,ref: "Lines",},
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Area", AreaSchema);
