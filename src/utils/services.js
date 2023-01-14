/**
 * @param {string} traceId
 * @param {{ error:string, message:string|number, json:object|array, }} option
 */
exports.print = (traceId, option) => {
  let text = "";
  if (option.error) {
    text += "[ERROR]";
  }
  text += `[${traceId}] : `;
  if (option.error) {
    text += option.error;
  }
  // -----------------------------------
  if (option.message) {
    if (option.error) {
      text += option?.json ? "\n├" : "\n└─";
      text += "[MESSAGE] : " + option.message;
    } else {
      text += option.message;
    }
  }
  if (option.json) {
    if (option.error) {
      text += "\n└─[JSON] : " + JSON.stringify(option.json);
    } else {
      text += JSON.stringify(option.json);
    }
  }
  console.log(text);
};
