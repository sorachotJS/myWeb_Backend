module.exports = {
    encodePassword: async (password) => {
      try {
        let data = password;
        let buff = Buffer.from(data);
        let base64data = buff.toString("base64");
  
        return await base64data;
      } catch (error) {
        return error;
      }
    },
    decodePassword: async (password) => {
      try {
        let data = password;
        let buff = Buffer.from(data, "base64");
        let base64data = buff.toString("utf-8");
  
        return await base64data;
      } catch (error) {
        return error;
      }
    },
  };
  