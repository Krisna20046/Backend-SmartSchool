const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "Dokumen",
  tableName: "dokumen",
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
    id_user_baru: {
      type: "int",
      nullable: true,
    },
    id_user: {
      type: "int",
      nullable: true,
    },

    // Basic
    filename: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
  },
});
