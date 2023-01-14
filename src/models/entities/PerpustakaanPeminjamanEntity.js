const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "PerpustakaanPeminjaman",
  tableName: "perpustakaan_peminjaman",
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
    id_user: {
      type: "int",
    },
    id_buku: {
      type: "int",
    },

    // Basic
    tanggal_peminjaman: {
      type: "timestamp",
      default: null,
    },
    tanggal_pengembalian: {
      type: "timestamp",
      default: null,
    },
    jumlah: {
      type: "int",
    },
  },
});
