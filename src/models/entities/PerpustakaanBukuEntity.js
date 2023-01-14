const EntitySchema = require("typeorm").EntitySchema;

const { kategori_buku } = require("../../consts");

module.exports = new EntitySchema({
  name: "PerpustakaanBuku",
  tableName: "perpustakaan_buku",
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
    cover: {
      type: "varchar",
      nullable: false,
    },
    judul: {
      type: "varchar",
      length: 200,
    },
    penulis: {
      type: "varchar",
      length: 200,
    },
    penerbit: {
      type: "varchar",
      length: 100,
    },
    jumlah: {
      type: "int",
    },
    kategori: {
      type: "enum",
      enum: Object.values(kategori_buku),
      default: kategori_buku.fiksi,
    },
    sumber: {
      type: "varchar",
      length: 200,
    },
    rak_buku: {
      type: "varchar",
    },
  },
});
