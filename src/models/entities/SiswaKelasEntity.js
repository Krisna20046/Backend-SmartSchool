const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "SiswaKelas",
  tableName: "siswa_kelas",
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
    id_siswa: {
      type: "int",
    },
    id_kelas: {
      type: "int",
    },
  },
});
