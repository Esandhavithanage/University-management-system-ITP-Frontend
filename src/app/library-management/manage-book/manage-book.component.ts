import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { LibraryService } from 'src/app/services/library.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit {
  subs1: Subscription;
  subs2: Subscription;
  books: Book[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj: Book;
  isUpdate: boolean = false;
  bookId;

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.subs1 = this.libraryService.getBooks().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.books.push(result[i]);
        this.totalRecords += 1;
      }

    });
  }

  canselUpdate() {
    if (this.isUpdate) {
      this.isUpdate = false;
    }
  }

  addOrUpdate(addForm: NgForm) {
    
    console.log(addForm.value);
    if (!this.isUpdate) {
      this.tempObj = {
        bookId: addForm.value.bookId,
        title: addForm.value.title,
        publisher: addForm.value.publisher,
        isbm: addForm.value.isbm,
        authorId: addForm.value.authorId,
      };

      this.libraryService.addBook(this.tempObj);
      this.books.push(this.tempObj);
      addForm.resetForm();
      this.totalRecords++;

    } else if (this.isUpdate) {
      this.tempObj = {
        bookId: this.bookId,
        title: addForm.value.title,
        publisher: addForm.value.publisher,
        isbm: addForm.value.isbm,
        authorId: addForm.value.authorId,
      };
      console.log(addForm.value);

      this.subs2 = this.libraryService.updateBooks(this.tempObj).subscribe(result => {
        if (result) {
          this.updateObj = {
            bookId: '',
            title: '',
            publisher: '',
            isbm: '',
            authorId: ''
          };
          this.isUpdate = false;
          addForm.resetForm();

          for (let i in this.books) {
            if (this.books[i].bookId == this.tempObj.bookId) {
              this.books[i] = this.tempObj;
            }
          }
        }
      });
    }
  }

  updateBtn(book: Book) {
    this.bookId = book.bookId;
    this.isUpdate = true;
    this.updateObj = {
      bookId: book.bookId,
      title: book.title,
      publisher: book.publisher,
      isbm: book.isbm,
      authorId: book.authorId
    };

  }

  deleteBtn(book: Book) {
    console.log(book.bookId);
    this.libraryService.deleteBook(book.bookId);
    for (let i in this.books) {
      if (this.books[i].bookId == book.bookId) {
        this.books.splice(parseInt(i), 1);
        this.totalRecords--;
      }
    }
  }

  top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngOnDestroy() {
    // this.subs1.unsubscribe();
    // this.subs2.unsubscribe();
  }

}
