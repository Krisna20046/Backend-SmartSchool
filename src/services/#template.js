const { print } = require("../utils/services");

// Repository
const Template = require("../models/repositories/NamaRepo");

// -----------------------------------------------------------------------------------

/**
get (params)
post (params, body)
put (params, body)
patch (params, body)
delete (params)
 */

//-> Web / Mobile

exports.Example = async (traceId, { aaa, bbb }) => {
  let message = "";
  try {
    // validasi body
    if (!(aaa && bbb)) {
      message = "body (aaa, bbb) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // validation
    const isExist = await Users.isExist(aaa);
    if (!isExist) {
      message = "aaa tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert / update / delete !!

    // render
    return {
      code: 200,
      render: {},
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "Template > Example", message });
    return {
      code: 500,
      message,
    };
  }
};
