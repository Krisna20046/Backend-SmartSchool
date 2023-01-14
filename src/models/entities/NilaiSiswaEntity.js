const EntitySchema = require("typeorm").EntitySchema;

const { } = require("../../consts");

module.exports = new EntitySchema({
  name: "NilaiSiswa",
  tableName: "nilai_siswa",
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
    tugas: {
      type: "int",
    },
    uh: {
      type: "int",
    },
    uts: {
      type: "int",
    },
    uas: {
      type: "int",
    },
  },
});
