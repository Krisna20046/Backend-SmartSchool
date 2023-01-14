const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "JadwalPelajaran",
  tableName: "jadwal_pelajaran",
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
    id_kelas: {
      type: "int",
    },

    // Basic
    nama: {
      type: "varchar",
      length: 50,
    },
    tanggal_waktu: {
      type: "timestamp",
      nullable: true,
    },
    keterangan: {
      type: "text",
      nullable: true,
    },
  },
});
