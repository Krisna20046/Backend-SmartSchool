const EntitySchema = require("typeorm").EntitySchema;

const { status_absen } = require("../../consts");

module.exports = new EntitySchema({
  name: "AbsenMurid",
  tableName: "absen_murid",
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

    foto_masuk: {
      type: "text",
      nullable: false,
    },
    foto_pulang: {
      type: "text",
      nullable: true,
    },

    status: {
      type: "enum",
      enum: Object.values(status_absen),
      default: status_absen.hadir,
    },
  },
});
