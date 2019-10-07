import { Component, OnInit } from '@angular/core';
import { LibraryService, CBook } from 'src/app/services/library.service';
import { Subscription, Subject } from 'rxjs';
import { BorrowRecord } from 'src/app/models/BorrowRecord';
import { NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface IDate {
  year: number,
  month: number,
  day: number
}

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  subs1: Subscription;
  subs2: Subscription;
  borrowRecords: BorrowRecord[] = [];
  borrowRecords2: BorrowRecord[] = [];
  totalRecords = 0;
  tempObj;
  deleted: boolean = false;
  error: string = "";
  rDateError: boolean = false;
  bDateError: boolean = false;
  studentIdError: boolean = false;
  bookId;

  bDate: IDate = {
    year: 0,
    month: 0,
    day: 0
  };
  rDate: IDate = {
    year: 0,
    month: 0,
    day: 0
  };

  returnCorrect: boolean = false;
  returnIncorrect: boolean = false;
  returnError: boolean = false;
  delayDays: number = 0;
  fine: number = 0;
  returnObjC = {};
  returnObjB = {
    studentId: '',
    cBookId: 0,
    fine: 0
  };

  cBookObj: CBook[] = [];
  deleteRecordId: number = null;

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

    // set bdate to current date
    let date = new Date();
    let today = date.toJSON().toString();
    this.bDate = {
      year: parseInt(today.substring(0, 4)),
      month: parseInt(today.substring(5, 7)),
      day: parseInt(today.substring(8, 10))
    };

    this.subs1 = this.libraryService.getBorrowRecords().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.borrowRecords2.push(result[i]);
        this.totalRecords += 1;
      }
      this.dtTrigger.next();

      this.borrowRecords = this.accordingRecords(this.borrowRecords2);

    });

  }

  close() {
    this.error = "";
    this.rDateError = false;
    this.bDateError = false;
    this.returnCorrect = false;
    this.returnIncorrect = false;
    this.studentIdError = false;
    this.modelService.dismissAll();
  }

  borrowBtn(popupElement) {
    this.error = "";
    this.rDateError = false;
    this.bDateError = false;
    this.studentIdError = false;
    this.modelService.open(popupElement, { centered: true, scrollable: true });

  }

  borrowOrUpdate(addForm: NgForm) {
    this.error = "";
    this.rDateError = false;
    this.bDateError = false;
    this.studentIdError = false;
    
    console.log(addForm.value);

    if (this.bDate == null || this.bDate.year == 0) {
      this.bDateError = true;
    }else if(this.rDate == null || this.rDate.year == 0){
      this.rDateError = true;
    } else {

      // set date correct format
    let b_date_m: string = null;
    let b_date_d: string = null;
    let r_date_m: string = null;
    let r_date_d: string = null;

    if (this.bDate.month < 10) {
      b_date_m = '0' + this.bDate.month;
    } else {
      b_date_m = this.bDate.month.toString();
    }

    if (this.bDate.day < 10) {
      b_date_d = '0' + this.bDate.day;
    } else {
      b_date_d = this.bDate.day.toString();
    }

    if (this.rDate.month < 10) {
      r_date_m = '0' + this.rDate.month;
    } else {
      r_date_m = this.rDate.month.toString();
    }

    if (this.rDate.day < 10) {
      r_date_d = '0' + this.rDate.day;
    } else {
      r_date_d = this.rDate.day.toString();
    }

    let tempBDate = this.bDate.year + "-" + b_date_m + "-" + b_date_d;
    let tempRDate = this.rDate.year + "-" + r_date_m + "-" + r_date_d;

      this.tempObj = {
        studentId: addForm.value.studentId,
        bookId: addForm.value.bookId,
        borrowDate: tempBDate,
        returnDate: tempRDate,
        status: 'borrowed'
      };

      this.libraryService.addBorrowRecord1(this.tempObj).subscribe(result => {
        for (let i in result) {
          this.cBookObj.push(result[i]);
        }
        console.log(this.cBookObj[2]);

        let tempobj = {
          studentId: this.tempObj.studentId,
          bookId: this.tempObj.bookId,
          borrowDate: this.tempObj.borrowDate,
          returnDate: this.tempObj.returnDate,
          cBookId: this.cBookObj[2]
        };

        this.libraryService.addBorrowRecord2(tempobj).subscribe(result => {
          console.log(result);
          if (result == "success") {
            let tempArray: BorrowRecord[] = this.borrowRecords;
            tempArray.push(this.tempObj);
            this.borrowRecords = this.accordingRecords(tempArray);
            addForm.resetForm();
            this.totalRecords++;
            this.modelService.dismissAll();
          } else if(result == "ER_NO_REFERENCED_ROW_2"){
            this.studentIdError = true;
          }else {
            this.error = "Borrowing was failed!";
          }
        });

      });

    }

  }

  deleteBtn(popupElement, record) {
    this.deleted = false;
    this.deleteRecordId = record.cBookId;
    this.modelService.open(popupElement);

  }

  delete() {
    console.log(this.deleteRecordId);

    this.libraryService.deleteBorrowRecord(this.deleteRecordId).subscribe(result => {
      if (result == "success") {
        this.deleted = false;

        let tempArray: BorrowRecord[] = this.borrowRecords;
        for (let i in tempArray) {
          if (tempArray[i].cBookId == this.deleteRecordId) {
            tempArray.splice(parseInt(i), 1);
            this.totalRecords--;
          }
        }
        this.borrowRecords = this.accordingRecords(tempArray);

        this.modelService.dismissAll();

      } else {
        this.deleted = true;
      }

    });

  }

  returnBtn(popupElement, record) {
    console.log(record);
    this.returnCorrect = false;
    this.returnIncorrect = false;
    this.returnError = false;
    this.returnObjB = {
      studentId: '',
      cBookId: 0,
      fine: 0
    };
    

    // cal delayed days
    let day1: string = record.returnDate;
    let date = new Date();
    let day2 = date.toJSON().toString();

    let day_r = new Date(day1);
    let day_t = new Date(day2);

    this.delayDays = parseInt(((parseInt(day_t.getTime().toString()) - parseInt(day_r.getTime().toString())) / (1000 * 60 * 60 * 24)).toString());

    console.log(this.delayDays);

    if (this.delayDays > 0) {
      // cal total fine
      this.fine = 20.00 * this.delayDays;

      this.returnObjC = {
        cBookId: record.cBookId,
        status: 'returned'
      };

      this.returnObjB = {
        studentId: record.studentId,
        cBookId: record.cBookId,
        fine: this.fine
      };

      this.returnIncorrect = true;
      this.modelService.open(popupElement, { centered: true });

    } else {
      this.returnObjC = {
        cBookId: record.cBookId,
        status: 'returned'
      };

      this.returnObjB = {
        studentId: record.studentId,
        cBookId: record.cBookId,
        fine: this.fine
      };

      this.returnCorrect = true;
      this.modelService.open(popupElement, { centered: true });
    }

  }

  return() {
    console.log(this.returnObjB);
    console.log(this.returnObjC);

    this.libraryService.returnBookC(this.returnObjC).subscribe(result => {
      if (result == "success") {

        this.libraryService.returnBookB(this.returnObjB).subscribe(result => {
          if (result == "success") {
            
            let tempArray: BorrowRecord[] = this.borrowRecords;
            for (let i in this.borrowRecords) {
              if (tempArray[i].studentId == this.returnObjB.studentId && tempArray[i].cBookId == this.returnObjB.cBookId) {
                tempArray[i].fine = this.fine;
                tempArray[i].status = 'returned';
              }
            }
            this.borrowRecords = this.accordingRecords(tempArray);
            this.fine = 0;
            this.modelService.dismissAll();

          } else {
            this.returnError = true;
          }
        });

      } else {
        this.returnError = true;
      }
    });

  }

  private accordingRecords(array) {
    let tempArray1: BorrowRecord[] = array;
    let tempArray2: BorrowRecord[] = [];
    // set the pending records first
    for (let i in tempArray1) {
      if(tempArray1[i].status == "borrowed"){
        tempArray2.push(tempArray1[i]);
      }
    }

    // set others after pending records 
    for (let i in tempArray1) {
      if(tempArray1[i].status != "borrowed"){
        tempArray2.push(tempArray1[i]);
      }
    }

    return tempArray2;
  }


  ngOnDestroy() {
    // this.subs1.unsubscribe();
    // this.subs2.unsubscribe();
  }

}
