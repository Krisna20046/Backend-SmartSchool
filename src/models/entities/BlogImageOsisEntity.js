const EntitySchema = require("typeorm").EntitySchema;

const { } = require("../../consts");

module.exports = new EntitySchema({
  name: "BlogImageOsis",
  tableName: "blog_image_osis",
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
    id_blog: {
      type: "int",
      nullable: false,
    },

    // Basic
    image: {
      type: "varchar",
      nullable: false,
    },
    keterangan: {
      type: "varchar",
      length: 100,
    },
  },
});
