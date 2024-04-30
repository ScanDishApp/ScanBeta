import DBManager from "../modules/storageManager.mjs"

class Favorites {

  constructor(userId, contents) {
    this.userId = userId;
    this.contents = contents;
  }

  async save() {
    if (this.id == null) {
      return await DBManager.favoritePage(this);
    }
  }

  async list() {
    console.log(this.userId);
    let dbFavorite = await DBManager.getFavorite(this.userId);
    if (dbFavorite) {
      this.userId = dbFavorite.userId;
      this.contents = dbFavorite.contents;

      return {
        success: true,
        dbFavorite: dbFavorite
      }
    } else {
      return {
        success: false,
        message: "request not found"
      };
    }
  }
  async delete() {
    if (this.id != null) {
      return await DBManager.deleteFavorite(this);
    }
  }
}

export default Favorites;