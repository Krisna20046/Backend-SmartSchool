const EntitySchema = require("typeorm").EntitySchema;

const {} = require("../../consts");

module.exports = new EntitySchema({
  name: "Sekolah",
  tableName: "sekolah",
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

    // Basic
    nama: {
      type: "varchar",
      unique: true,
    },
    origin: {
      type: "varchar",
      unique: true,
    },
    logo: {
      type: "text",
      nullable: true,
    },
    alamat: {
      type: "text",
      nullable: true,
    },
    type: {
      type: "varchar",
    },

    // kartu pelajar digital
    warna_kartu: {
      type: "varchar",
      default: "#000",
    },
    logo_dinas: {
      type: "text",
      nullable: true,
    },

    // membuka portal pendaftaran
    is_penerimaan_siswa: {
      type: "boolean",
      default: false,
    },
  },
});
