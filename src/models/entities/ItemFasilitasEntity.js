const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "ItemFasilitas",
  tableName: "item_fasilitas",
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
    icon: {
      type: "varchar",
    },
    nama: {
      type: "varchar",
      length: 200,
    },
    kategori: {
      type: "varchar",
      length: 50,
    },
    jumlah: {
      type: "int",
    },
    keterangan: {
      type: "text",
    },
  },
});
