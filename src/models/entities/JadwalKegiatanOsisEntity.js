const EntitySchema = require("typeorm").EntitySchema;

const { status_approve } = require("../../consts");

module.exports = new EntitySchema({
  name: "JadwalKegiatanOsis",
  tableName: "jadwal_kegiatan_osis",
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
    prefix: {
      type: "varchar",
      length: 150,
      unique: true,
    },
    kegiatan: {
      type: "varchar",
      length: 130,
    },
    lokasi: {
      type: "varchar",
    },
    tanggal_waktu: {
      type: "timestamp",
      nullable: true,
    },
    status: {
      type: "enum",
      enum: Object.values(status_approve),
      default: status_approve.waiting,
    },

    // Choice
    is_selesai: {
      type: "boolean",
      default: false,
    },
  },
});
