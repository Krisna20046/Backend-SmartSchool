const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "KeuanganKeluar",
  tableName: "keuangan_keluar",
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
    ambil_dana: {
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
    keterangan: {
      type: "varchar",
      length: 50,
    },
    nota: {
      type: "varchar",
    },
  },
});
