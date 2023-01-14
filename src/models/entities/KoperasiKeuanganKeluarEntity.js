const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "KoperasiKeuanganKeluar",
  tableName: "koperasi_keuangan_keluar",
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
    nominal: {
      type: "int",
    },
    tanggal_waktu: {
      type: "timestamp",
      nullable: true,
    },
    keterangan: {
      type: "varchar",
      length: 200,
    },
  },
});
