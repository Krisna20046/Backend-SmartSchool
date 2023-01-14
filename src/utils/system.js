const child_process = require("child_process");
const Fix = require("../helpers/fix");
const { project_root } = require("../consts");

const formatUptime = (seconds) => {
  const fix_seconds = parseInt(seconds, 10);
  const hours = Math.floor(fix_seconds / (60 * 60));
  const minutes = Math.floor((fix_seconds % (60 * 60)) / 60);
  const ok_seconds = Math.floor(fix_seconds % 60);
  return `${Fix.FirstZeros(hours)} Jam ${Fix.FirstZeros(
    minutes
  )} Menit ${Fix.FirstZeros(ok_seconds)} Detik`;
};

module.exports = {
  uptime: () => {
    return formatUptime(process.uptime());
  },

  /**
   * @param {string[]} cmd
   * @param {string} dirname
   * @returns
   */
  execute: async (cmd, dirname = project_root) => {
    return await new Promise((resolve, reject) => {
      child_process
        .exec(
          cmd.join(" && "),
          {
            cwd: dirname,
          },
          (error, stdout, stderr) => {
            if (error) {
              reject(new Error(error.message));
            } else {
              resolve(stdout);
            }
          }
        )
        .stdout.pipe(process.stdout);
    });
  },
};
