const typeorm = require("typeorm");

const { isArray, isObject } = require("../helpers/validation");

/**
 * @param {{}} where
 * @returns
 */
function createWhereSelector(where) {
  return Object.keys(where)
    .reduce((simpan, key) => {
      return [...simpan, `${key}=:${key}`];
    }, [])
    .join(" AND ");
}

/**
 * @param {{}} where
 * @returns
 */
function createWhereLikeSelector(where) {
  if (Object.keys(where).length > 0) {
    return Object.keys(where)
      .reduce((simpan, key) => {
        return [
          ...simpan,
          where[key] === "*" ? false : `LOWER(${key}) LIKE :${key}`,
        ];
      }, [])
      .filter((v) => {
        return v;
      })
      .join(" OR ");
  }
  return "";
}

// ===================================================================================

const Model = {
  /**
   * Create : insert new data
   * @param {*} entity
   * @param {[]|{}} data
   * @returns
   */
  inputFrom: async (entity, data) => {
    const new_data = [];
    if (isArray(data)) {
      new_data.push(...data);
    } else if (isObject(data)) {
      new_data.push(data);
    } else {
      throw new Error("please use Array Or Object to insert data!!!");
    }
    try {
      return await typeorm
        .getConnection()
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(new_data)
        .execute();
    } catch (error) {
      return false;
    }
  },

  /**
   * Create : insert new data with ID
   * @param {*} entity
   * @param {[]|{}} data
   * @returns
   */
  inputFromGetId: async (entity, data) => {
    const new_data = [];
    if (isArray(data)) {
      new_data.push(...data);
    } else if (isObject(data)) {
      new_data.push(data);
    } else {
      throw new Error("please use Array Or Object to insert data!!!");
    }
    try {
      const result = await typeorm
        .getConnection()
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(new_data)
        .execute();
      return result.identifiers[0].id;
    } catch (error) {
      return false;
    }
  },

  /**
   * Read : view data
   * @param {*} entity
   * @param {{}} where
   * @returns
   */
  selectFrom: async (entity, where = {}) => {
    return await typeorm
      .getRepository(entity)
      .createQueryBuilder()
      .where(createWhereSelector(where), where)
      .getMany();
  },

  /**
   * Read : make custom query
   * @param {string} query
   * @returns
   */
  customQuery: async (query) => {
    const entityManager = typeorm.getManager();
    return entityManager.query(query, []);
  },

  /**
   * Read : make list data by query in()
   * @param {*} Entity
   * @param {string} selector
   * @param {[]} array
   * @returns
   */
  in: async (Entity, selector, array) => {
    const id = array
      .filter((v) => !String(v).includes("'")) // escape SQLi
      .map((v) => `'${v}'`)
      .join(", ");
    if (id.length === 0) return [];
    return await Model.customQuery(
      `SELECT * FROM ${Entity.options.tableName} WHERE ${selector} in(${id})`
    );
  },

  /**
   * Read : validation data
   * @param {*} entity
   * @param {{}} where
   * @returns
   */
  isExist: async (entity, where) => {
    const result = await Model.selectFrom(entity, where);
    if (result.length > 0) {
      return result[0];
    }
    return false;
  },

  /**
   * Read : for table
   * @param {*} entity
   * @param {{ keywords:{[key:string]:string}, filters:{[key:string]:{operator?:string,value:string|number|boolean}}, show:number, page:number, desc:boolean }} options
   * @returns
   */
  paginationFrom: async (entity, options) => {
    let { keywords, filters, show, page, desc } = options;

    if (
      !keywords ||
      typeof keywords === "undefined" ||
      typeof keywords !== "object" ||
      Array.isArray(keywords)
    ) {
      keywords = {};
    } else {
      keywords = Object.keys(keywords).reduce((simpan, key) => {
        if (keywords[key] && keywords[key].replace(/'/g, "").length > 0) {
          return {
            ...simpan,
            [key]:
              keywords[key].replace(/'/g, "") === "*"
                ? "*"
                : `%${String(keywords[key]).replace(/'/g, "").toLowerCase()}%`,
          };
        }
        return {
          ...simpan,
        };
      }, {});
    }

    if (!filters || typeof filters !== "object" || Array.isArray(filters)) {
      filters = "";
    } else {
      filters = Object.keys(filters)
        .reduce((simpan, key, i) => {
          const target = String(filters[key]).replace(/'/g, "");
          if (filters[key] !== undefined && target.length > 0) {
            return [...simpan, ` LOWER(${key}) LIKE '%${target}%' `];
          }
          return [...simpan];
        }, [])
        .join(" AND ");
      if (Object.keys(keywords).length > 0) {
        filters = " AND " + filters;
      }
    }

    if (!show || typeof show !== "number") {
      show = 10;
    }
    if (!page || typeof page !== "number") {
      page = 1;
    }
    if (typeof desc !== "boolean") {
      desc = false;
    }

    const take = show <= 0 ? 10 : show;
    const pagez = parseInt(page, 10) <= 0 ? 1 : parseInt(page, 10);

    const orderBy = desc ? "DESC" : "ASC";
    const skip = (pagez - 1) * take;

    const totalData = (await Model.selectFrom(entity, {})).length;

    const query = createWhereLikeSelector(keywords) + filters;
    // console.log({ query, keywords, filters });
    const data = await typeorm
      .getRepository(entity)
      .createQueryBuilder()
      .where(query, keywords)
      .orderBy("id", orderBy)
      .skip(skip)
      .take(take)
      .getMany();

    // return data
    const lastPage = Math.ceil(totalData / show);
    const nextPage = pagez + 1 > lastPage ? 0 : pagez + 1;
    let prevPage = pagez - 1 < 1 ? 0 : pagez - 1;
    prevPage = prevPage > lastPage ? lastPage : prevPage;

    return {
      data,
      totalData,

      currentPage: pagez,
      lastPage,
      nextPage,
      prevPage,
    };
  },

  /**
   * Update : update data
   * @param {*} entity
   * @param {{}} selector
   * @param {{}} data
   * @returns
   */
  updateFrom: async (entity, where, data) => {
    return await typeorm
      .getConnection()
      .createQueryBuilder()
      .update(entity)
      .set(data)
      .where(createWhereSelector(where), where)
      .execute();
  },

  /**
   * Delete : delete data
   * @param {*} entity
   * @param {{}} where
   * @returns
   */
  deleteFrom: async (entity, where) => {
    if ((await Model.selectFrom(entity, where)).length > 0) {
      return await typeorm
        .getConnection()
        .createQueryBuilder()
        .delete()
        .from(entity)
        .where(createWhereSelector(where), where)
        .execute();
    }
    return false;
  },
};

module.exports = Model;
