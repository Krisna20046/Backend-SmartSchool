const EntitySchema = require("typeorm").EntitySchema;

const { } = require("../../consts");

module.exports = new EntitySchema({
  name: "JadwalTambahan",
  tableName: "jadwal_tambahan",
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
    id_kelas: {
      type: "int",
    },

    // Basic
    mapel: {
      type: "varchar",
      length: 50,
    },
    guru: {
      type: "varchar"
    },
    hari: {
      type: "varchar"
    },
    jam: {
      type: "varchar"
    },
    status: {
      type: "varchar"
    },
  },
});
