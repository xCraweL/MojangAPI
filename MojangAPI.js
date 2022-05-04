const {default: fetch} = require("node-fetch");
class MojangAPI {
  constructor({username} = {}) {
    this.username = username;
    this.uuidAPI = "https://api.mojang.com/users/profiles/minecraft/" + username;
  }

  async getUUID() {
    let api = await fetch(this.uuidAPI).then((res) => res.json());

    if(api) {
      return api['id'];
    } else {
      return false;
    }
  }
  
  async getUsername() {
    let api = await fetch(this.uuidAPI).then((res) => res.json());

    try {
      return api['name'];
    } catch {
      return false;
    }
  }

  async getLastUsernames() {
    let uuid = await this.getUUID();

    try {
      let api = await fetch("https://api.mojang.com/user/profiles/"+uuid+"/names").then((res) => res.json());

      return api;
    } catch {
      return false;
    }
  }
}

module.exports = { MojangAPI }