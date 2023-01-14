const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "ApkVersion",
  tableName: "apk_version",
  columns: {
    // Meta : Selector

    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    // ---------------------------------------- //
    // Meta : Timeline

    create_date: {
      type: "timestamp",
      default: () => {
        return "now()";
      },
    },

    // ---------------------------------------- //
    //-> Main Content

    // Foreign Key
    version: {
      type: "varchar",
      unique: true,
    },
    file_path: {
      type: "varchar",
    },
  },
});
