const EntitySchema = require("typeorm").EntitySchema;

const { status_ekskul } = require("../../consts");

module.exports = new EntitySchema({
  name: "Ekstrakurikuler",
  tableName: "ekstrakurikuler",
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
    id_sekolah: {
      type: "int",
    },

    // Basic
    nama: {
      type: "varchar",
      length: 100,
    },
    hari: {
      type: "varchar",
      length: 50,
    },
    jam: {
      type: "varchar",
    },
    image: {
      type: "varchar",
    },

    status_ekstrakurikuler: {
      type: "enum",
      enum: Object.values(status_ekskul),
      default: status_ekskul.aktif,
    },
  },
});
