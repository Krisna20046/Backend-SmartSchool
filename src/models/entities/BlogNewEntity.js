const EntitySchema = require("typeorm").EntitySchema;

const { } = require("../../consts");

module.exports = new EntitySchema({
  name: "BlogNew",
  tableName: "blog_new",
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
    id_tu: {
      type: "int",
    },

    // Basic
    prefix: {
      type: "varchar",
      length: 150,
      unique: true,
    },
    judul: {
      type: "varchar",
      length: 100,
    },
    konten: { // html
      type: "text",
    },
    image: {
      type: "varchar",
    },
    keterangan: {
      type: "varchar",
    },
  },
});
