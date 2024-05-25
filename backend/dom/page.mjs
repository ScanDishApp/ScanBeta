import DBManager from "../modules/storageManager.mjs"
class Page {

  constructor(id, bookId,  title, ingridens, imageFile, desc, images, selectedColor, selectedFont ) {
    this.id = id;
    this.bookId = bookId;
    this.ingridens = ingridens;
    this.title = title;
    this.imageFile = imageFile;
    this.desc = desc;
    this.images = images;
    this.selectedColor = selectedColor;
    this.selectedFont = selectedFont;
  }

  async save() {
    if (this.id == null) {
      return await DBManager.createPage(this);
    } else {
      return await DBManager.updatePage(this);
    }
  }

  async delete() {

    if (this.bookId != null) {
      return await DBManager.deletePage(this.bookId);
    }
  }

  async getPages() {
    let dbPage = await DBManager.getPages(this.bookId);
    if (dbPage) {
      return {
        success: true,
        dbPage: dbPage
       
      };
    } else {
      return {
        success: false,
        message: "Pages not found"
      };
    }
  }

}

export default Page;