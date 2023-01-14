const EntitySchema = require("typeorm").EntitySchema;

const { } = require("../../consts");

module.exports = new EntitySchema({
  name: "NilaiSiswaK",
  tableName: "nilai_siswa_k",
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
    id_siswa: {
      type: "int",
    },
    /*    id_mapel: {
          type: "int",
        }, */

    // Basic
    kelas: {
      type: "varchar",
    },
    mapel: {
      type: "varchar",
    },
    semester: {
      type: "int",
    },
    kategori: {
      type: "varchar",
    },
    nilai: {
      type: "int",
    },
  },
});
