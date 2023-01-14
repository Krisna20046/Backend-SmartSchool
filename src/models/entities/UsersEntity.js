const EntitySchema = require("typeorm").EntitySchema;

const { role_user, default_password, religions, jenis_kelamin } = require("../../consts");

module.exports = new EntitySchema({
  name: "Users",
  tableName: "users",
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
      nullable: true,
    },

    // Auth
    role: {
      type: "enum",
      enum: Object.values(role_user),
      default: role_user.murid,
    },

    // Authorization
    username: {
      // NIS, NISN, NITK
      type: "varchar",
      length: 30,
      unique: true,
    },
    password: {
      type: "varchar",
      default: default_password,
    },
    no_hp: {
      type: "varchar",
      length: 15,
    },
    email: {
      type: "varchar",
    },

    // Basic (murid, guru)
    nama: {
      type: "varchar",
      length: 50,
    },
    tempat_lahir: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    tanggal_lahir: {
      // format date
      type: "varchar",
      length: 50,
      nullable: true,
    },
    alamat: {
      type: "varchar",
      length: 50,
      nullable: true,
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

    foto: {
      type: "text",
      nullable: true,
    },

    // ortu (murid)
    nama_ortu_lk: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    nama_ortu_pr: {
      type: "varchar",
      length: 100,
      nullable: true,
    },

    // Change (murid)
    is_alumni: {
      type: "boolean",
      default: false,
    },
  },
});
