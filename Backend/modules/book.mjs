import DBManager from "./storageManager.mjs";

class Book {

  constructor(id, userId, contents) {
    this.id = id;
    this.userId = userId;
    this.contents = contents;
  }

  async save() {

    if (this.id == null) {
      return await DBManager.createBook(this);
    } else {
      return await DBManager.updateUser(this);
    } updateBook
  }

  async delete() {
    
    
    if (this.id != null) {
      return await DBManager.deleteBook(this.id);
    }

  }


  async getBook() {

    let dbBook = await DBManager.getBook(this.id);

    if (dbBook.length > 0) {

      return {
        success: true,
        dbBook: dbBook
      };
    } else {
      return {
        success: false,
        message: "Book not found"
      };
    }
  }

}

export default Book;