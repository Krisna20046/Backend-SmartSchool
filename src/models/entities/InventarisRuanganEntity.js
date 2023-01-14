const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "InventarisRuangan",
  tableName: "inventaris_ruangan",
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
    id_ruangan: {
      type: "int",
    },
    id_inventaris: {
      type: "int",
    },

    // Basic
    jumlah: {
      type: "int",
    },
    keterangan: {
      type: "varchar",
      length: 50,
    }
  },
});
