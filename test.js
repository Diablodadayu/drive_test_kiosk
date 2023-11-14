// const bcrypt = require("bcrypt");
// const password = "123";
// const password_encrypted = bcrypt.hashSync(password, 10);
// console.log(password_encrypted);
// const cpmparing_result = bcrypt.compareSync(password, "$2b$10$ELBMHwsxjQ5bSqmRYml/luRoD6wopaxqkqGhtZooANnluI3xkBb5O");
// console.log(cpmparing_result)

// const md5 = require("md5");
// console.log(md5("123456"));

const bcrypt = require("bcrypt");
const password = "123";
bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      console.error(error);
      return
    }
    console.log(hash);

    bcrypt.compare(password.trim(), hash, (error, isSame) => {
        if (isSame) {
        console.log("isSame: ", isSame);
        } else {
        console.log("Form Password: " + password.trim());
        console.log("Model Password: " + hash);
        console.log('PASSWORD NOT MATCH');

        }
    })
})