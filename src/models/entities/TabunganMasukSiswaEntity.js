const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "TabunganMasukSiswa",
  tableName: "tabungan_masuk_siswa",
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

    // Basic
    nama: {
      type: "varchar",
    },
    tanggal_waktu: {
      type: "timestamp",
      default: null,
    },
    nominal: {
      type: "int",
    },
  },
});
