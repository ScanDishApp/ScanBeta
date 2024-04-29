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
      return await DBManager.updateBook(this);
    } 
  }

  async delete() {
    
    
    if (this.id != null) {
      return await DBManager.deleteBook(this.id);
    }

  }


  async getBook() {

    let dbBook = await DBManager.getBook(this.id);

    if (dbBook) {
      this.id = dbBook.id;
      this.userId = dbBook.userId;
      this.contents = dbBook.contents;

      return {
        success: true,
        dbBook: {
          id: this.id,
          userId: this.userId,
          contents: this.contents
        }
      };
    } else {
      return {
        success: false,
        message: "Book not found"
      };
    }
  }
  async listBook() {

    let dbBook = await DBManager.listBook(this.userId);

    if (dbBook) {
      this.id = dbBook.id;
      this.userId = dbBook.userId;
      this.contents = dbBook.contents;

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
  async listSharedBook() {

    let dbBook = await DBManager.listSharedBook(this.userId);
  
    if (dbBook) {
      this.id = dbBook.id;
      this.userId = dbBook.userId;
      this.contents = dbBook.contents;
  
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