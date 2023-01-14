const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "SiswaWaliMurid",
  tableName: "siswa_wali_murid",
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

    id_wali: {
      type: "int",
    },
    id_siswa: {
      type: "int",
    },
  },
});
