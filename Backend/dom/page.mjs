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

    if (this.id != null) {
      return await DBManager.deletePage(this.id);
    }

  }


  async getPages() {
    let dbPage = await DBManager.getPage(this.id);
    if (dbPage) {
      this.id = dbPage.id;
      this.bookId = dbPage.bookId;
      this.ingridens = dbPage.ingridens;
      this.title = dbPage.title;
      this.imageFile = dbPage.imageFile;
      this.desc = dbPage.desc;
      this.images = dbPage.images;
      this.selectedColor = dbPage.selectedColor;
      this.selectedFont = dbPage.selectedFont;

      return {
        success: true,
        dbPage: {
          id: this.id,
          bookId: this.bookId,
          ingridens: this.ingridens,
          title: this.title, 
          imageFile: this.imageFile,
          desc: this.desc,
          images: this.images,
          selectedColor: this.selectedColor,
          selectedFont: this.selectedFont
        }
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