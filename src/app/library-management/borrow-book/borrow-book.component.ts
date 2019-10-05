import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library.service';
import { Subscription } from 'rxjs';
import { BorrowRecord } from 'src/app/models/BorrowRecord';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  subs1: Subscription;
  subs2: Subscription;
  borrowRecords: BorrowRecord[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj;
  isUpdate: boolean = false;
  bookId;

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.subs1 = this.libraryService.getBorrowRecords().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.borrowRecords.push(result[i]);
        this.totalRecords += 1;
      }

    });

  }

  add(addForm: NgForm) {

    console.log(addForm.value);

    this.tempObj = {
      studentId: addForm.value.studentId,
      bookId: addForm.value.bookId,
      borrowDate: addForm.value.borrowDate,
      returnDate: addForm.value.returnDate,
    };

    this.libraryService.addBorrowRecord(this.tempObj);
    this.borrowRecords.push(this.tempObj);
    addForm.resetForm();
    this.totalRecords++;
    
  }

  deleteBtn(borrowRecord: BorrowRecord) {
    console.log(borrowRecord.cBookId);
    this.libraryService.deleteBorrowRecord(borrowRecord.cBookId);
    for (let i in this.borrowRecords) {
      if (this.borrowRecords[i].cBookId == borrowRecord.cBookId) {
        this.borrowRecords.splice(parseInt(i), 1);
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
