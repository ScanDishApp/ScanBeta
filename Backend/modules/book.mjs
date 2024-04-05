import DBManager from "./storageManager.mjs";

class Book {

  constructor(id, userId, contents) {
    this.id = id;
    this.userId = userId;
    this.content = content;
  }

  async save() {
   
    if (this.id == null) {
      return await DBManager.createBook(this);
    } else {
      return await DBManager.updateUser(this);
    }updateBook
  }

  async delete() {

    if (this.id != null) {
      return await DBManager.deleteBook(this);
    }

  }

  
  async getBook() {
    let dbBook = await DBManager.getBook(this.id);

    if (getBook.id != null) {
      

        return {
          success: true,
          user: {
            id: this.id,
            name: this.name,
            email: this.email,
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

export default Book;