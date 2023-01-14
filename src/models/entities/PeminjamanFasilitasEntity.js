const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "PeminjamanFasilitas",
  tableName: "peminjaman_fasilitas",
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
    id_item_fasilitas: {
      type: "int",
    },

    // Basic
    tanggal_waktu: {
      type: "timestamp",
      nullable: true,
    },
    jam_peminjaman: {
      type: "varchar",
      length: 50,
    },
    jumlah: {
      type: "int",
    },

    // Choice
    is_kembalikan: {
      type: "boolean",
      default: false,
    },
  },
});
