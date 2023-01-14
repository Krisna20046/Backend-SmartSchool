const EntitySchema = require("typeorm").EntitySchema;

const { } = require("../../consts");

module.exports = new EntitySchema({
  name: "AbsenOsis",
  tableName: "absen_osis",
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
    id_siswa: {
      type: "int",
    },

    // Basic
    tanggal: {
      type: "int",
      precision: 2,
    },
    bulan: {
      type: "int",
      precision: 2,
    },
    tahun: {
      type: "int",
      precision: 4,
    },

    // Coordinate
    lon: {
      type: "varchar",
      nullable: true,
    },
    lat: {
      type: "varchar",
      nullable: true,
    },

    foto: {
      type: "varchar",
    },

    is_ijin: {
      type: "boolean",
      default: false,
    },
    reason: {
      type: "text",
      nullable: true,
    },
  },
});
