const usersService = require("./users");
const {exec} = require("child_process");
const {deleteFile} = require("../utils/fileHelper");
const fs = require("fs");
const {appendFile, readFile} = fs.promises;

module.exports = {
  getJaccardRecommendations: async (id) => {
    console.log("Starting")
    console.log(new Date());
    const user = await usersService.getByIdForRecommendations(id);
    const users = await usersService.getNotFriendsForRecommendations(id);
    const date = Date.now();

    const argsFileName = `tmp/rs/args-${id}-${date}.json`;
    const responseFileName = `tmp/rs/response-${id}-${date}.json`;
    const scriptFileName = "src/rs/jaccard-rs.py"

    console.log("Writing args to file")
    console.log(new Date());
    await appendFile(
      argsFileName,
      JSON.stringify({ user, users }),
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );

    console.log("Executing python script...")
    console.log(new Date());

    return new Promise((resolve, reject) => {
      exec(`python ${scriptFileName} ${argsFileName} ${responseFileName}`,
        async (error, stdout, stderr) => {
          console.log("Script is finished")
          console.log(new Date());
          function handleError(err) {
            deleteFile(argsFileName);
            reject(err);
          }
          if (error || stderr) {
            handleError(error || new Error(stderr));
          } else {
            const result = stdout.toString().trim();
            if (result === "OK") {
              try {
                const buffer = await readFile(responseFileName);
                const resultParsed = JSON.parse(buffer.toString());
                deleteFile(argsFileName);
                deleteFile(responseFileName);
                const users = await usersService.getRecommendedUsers(resultParsed);
                console.log("Resolving results")
                console.log(new Date());
                resolve(users);
              } catch (readError) {
                handleError(readError);
              }
            } else {
              handleError(new Error("Unexpected result"));
            }
          }
        });
    });
  }
}
