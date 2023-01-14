const EntitySchema = require("typeorm").EntitySchema;

const { } = require("../../consts");

module.exports = new EntitySchema({
  name: "KeuanganMasuk",
  tableName: "keuangan_masuk",
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
    jenis_dana: {
      type: "varchar",
      length: 50,
    },
    tanggal_waktu: {
      type: "timestamp",
      nullable: true,
    },
    nominal: {
      type: "int",
    },
  },
});
