const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "Pembelian",
  tableName: "pembelian",
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
    nama_pembeli: {
      type: "varchar",
    },
    tanggal_waktu: {
      type: "timestamp",
      nullable: true,
    },
    is_lunas: {
      type: "boolean",
      default: false,
    },
  },
});
