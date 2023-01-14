const EntitySchema = require("typeorm").EntitySchema;

const { religions, jenis_kelamin } = require("../../consts");

module.exports = new EntitySchema({
  name: "SiswaBaru",
  tableName: "siswa_baru",
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
      length: 100,
    },
    nisn: {
      type: "varchar",
      length: 20,
    },
    tempat_lahir: {
      type: "varchar",
      length: 50,
    },
    tanggal_lahir: {
      type: "varchar",
      length: 50,
    },
    alamat: {
      type: "varchar",
      length: 50,
    },
    agama: {
      type: "enum",
      enum: Object.values(religions),
      default: religions.islam,
    },
    jk: {
      type: "enum",
      enum: Object.values(jenis_kelamin),
    },

    no_hp: {
      type: "varchar",
      length: 16,
    },
    nama_ortu_lk: {
      type: "varchar",
      length: 100,
    },
    nama_ortu_pr: {
      type: "varchar",
      length: 100,
    },

    foto: {
      type: "text",
      nullable: true,
    },

    is_mutasi: {
      type: "boolean",
      default: false, // dianggap semua yang masuk ke sini adalah siswa baru
    },
  },
});
