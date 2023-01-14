const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "BarangKoperasi",
  tableName: "barang_koperasi",
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
    nama: {
      type: "varchar",
      length: 200,
    },
    kategori: {
      type: "varchar",
      length: 50,
    },
    harga: {
      type: "int",
    },
    jumlah: {
      type: "int",
    },
  },
});
