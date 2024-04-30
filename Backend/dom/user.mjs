import DBManager from "../modules/storageManager.mjs";

class User {

  constructor(email, pswHash, name, id, img) {
    this.email = email;
    this.pswHash = pswHash;
    this.name = name;
    this.id = id;
    this.img = img;
  }

  async save() {

    console.log(this.id);
    if (this.id == null) {
      return await DBManager.createUser(this);
    } else {
      return await DBManager.updateUser(this);
    }
  }

  async delete() {

    if (this.id != null) {
      return await DBManager.deleteUser(this);
    }

  }

  async getUser() {
    let dbUser = await DBManager.getUser(this.id);

    if (dbUser.id != null) {
      this.id = dbUser.id;
      this.name = dbUser.name;
      this.email = dbUser.email;
      this.pswHash = dbUser.pswHash;
      this.img = dbUser.img

      return {
        success: true,
        user: {
          id: this.id,
          name: this.name,
          email: this.email,
          img: this.img
        }
      }
    } else {

      return null;
    }
  }

  async login() {
    let dbUser = await DBManager.loginUser(this.email, this.pswHash);

    if (dbUser.id != null) {
      if (dbUser.pswHash == this.pswHash) {
        this.id = dbUser.id;
        this.name = dbUser.name;
        this.email = dbUser.email;
        this.pswHash = dbUser.pswHash;
        this.img = dbUser.img;

        return {
          success: true,
          user: {
            id: this.id,
            name: this.name,
            email: this.email,
            img: this.img
          }
        }
      } else {
        return {
          success: false,
          message: "Invalid login credentials"
        }
      }
    } else {

      return {
        success: false,
        message: "User dosent exist"
      }
    }
  }
}

export default User;