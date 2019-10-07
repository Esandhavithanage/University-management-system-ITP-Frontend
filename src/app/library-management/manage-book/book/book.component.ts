import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { LibraryService } from 'src/app/services/library.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj;
  deleteObj;
  isUpdate: boolean = false;
  bookId;
  bookIdError: boolean = false;
  autherIdError: boolean = false;
  inserted: boolean = false;
  updated: boolean = false;
  error: boolean = false;
  isDeleted: boolean = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private libraryService: LibraryService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.libraryService.getBooks().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.books.push(result[i]);
        this.totalRecords += 1;
      }
      this.dtTrigger.next();

    });

  }

  addWindowOpen(popupElement) {
    this.updateObj = {};
    this.inserted = false;
    this.updated = false;
    this.autherIdError = false;
    this.bookIdError = false;
    this.error = false;
    this.modelService.open(popupElement, { centered: true, scrollable: true });
  }

  addOrUpdate(addForm: NgForm) {
    this.inserted = false;
    this.updated = false;
    this.autherIdError = false;
    this.bookIdError = false;
    this.error = false;

    console.log(addForm.value);
    if (!this.isUpdate) {
      this.tempObj = {
        bookId: addForm.value.bookId,
        title: addForm.value.title,
        publisher: addForm.value.publisher,
        isbm: addForm.value.isbm,
        autherId: addForm.value.autherId,
      };

      this.libraryService.addBook(this.tempObj).subscribe(result => {
        if (result == "success") {
          this.books.push(this.tempObj);
          addForm.resetForm();
          this.totalRecords++;
          this.modelService.dismissAll();
        } else if (result == "ER_NO_REFERENCED_ROW_2") {
          this.autherIdError = true;
        } else if (result == "ER_DUP_ENTRY") {
          this.bookIdError = true;
        } else {
          this.error = true;
        }
      });


    } else if (this.isUpdate) {
      this.tempObj = {
        bookId: this.bookId,
        title: addForm.value.title,
        publisher: addForm.value.publisher,
        isbm: addForm.value.isbm,
        autherId: addForm.value.autherId,
      };
      console.log(addForm.value);

      this.libraryService.updateBooks(this.tempObj).subscribe(result => {

        if (result == "success") {
          this.isUpdate = false;
          addForm.resetForm();
          this.modelService.dismissAll();

          for (let i in this.books) {
            if (this.books[i].bookId == this.tempObj.bookId) {
              this.books[i] = this.tempObj;
            }
          }

        } else if (result == "ER_NO_REFERENCED_ROW_2") {
          this.autherIdError = true;
        } else {
          this.error = true;
        }
      });
    }
  }

  updateBtn(book, popupElement) {
    this.bookId = book.bookId;
    this.isUpdate = true;
    this.inserted = false;
    this.updated = false;
    this.bookIdError = false;
    this.autherIdError = false;
    this.error = false;

    this.updateObj = {
      bookId: book.bookId,
      title: book.title,
      publisher: book.publisher,
      isbm: book.isbm,
      autherId: book.autherId
    };

    this.modelService.open(popupElement, { centered: true, scrollable: true });

  }

  deleteWindowOpen(deleteObj, popupElement) {
    this.isDeleted = false;

    this.deleteObj = {
      bookId: deleteObj.bookId,
      autherId: deleteObj.autherId,
      isbm: deleteObj.isbm,
      publisher: deleteObj.publisher,
      title: deleteObj.publisher
    };
    console.log(this.deleteObj);

    this.modelService.open(popupElement);

  }

  delete() {
    this.isDeleted = false;

    console.log(this.deleteObj.bookId);

    this.libraryService.deleteBook(this.deleteObj.bookId).subscribe(result => {

      if (result == "success") {
        this.isDeleted = false;

        for (let i in this.books) {

          if (this.books[i].bookId == this.deleteObj.bookId) {
            this.books.splice(parseInt(i), 1);
            this.totalRecords--;
          }
        }
        this.modelService.dismissAll();
      } else {

        this.isDeleted = true;
      }
    });

  }

  close() {
    this.isUpdate = false;
    this.modelService.dismissAll();
  }

}
