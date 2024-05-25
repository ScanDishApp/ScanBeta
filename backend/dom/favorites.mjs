import DBManager from "../modules/storageManager.mjs";

class Favorites {

  constructor(userId, contents, id) {
    this.userId = userId;
    this.contents = contents;
    this.id = id;
  }

  async save() {
    if (this.id == null) {
      return await DBManager.favoritePage(this);
    }
  }

  async list() {
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
        message: "favorite not found"
      };
    }
  }
  
  async listOffline() {
    let dbFavorite = await DBManager.getOfflineFavorite(this.id);
    if (dbFavorite) {
      this.id = dbFavorite.id;
      return {
        success: true,
        dbFavorite: dbFavorite
      }
    } else {
      return {
        success: false,
        message: "favorite not found"
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