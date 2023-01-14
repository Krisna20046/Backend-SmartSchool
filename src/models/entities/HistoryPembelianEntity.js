const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "HistoryPembelian",
  tableName: "history_pembelian",
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
    id_pembelian: {
      type: "int",
    },

    // Basic
    nama_barang: {
      type: "varchar",
    },
    quantity: {
      type: "varchar",
    },
  },
});
