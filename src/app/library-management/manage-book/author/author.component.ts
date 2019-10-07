import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LibraryService } from 'src/app/services/library.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Auther } from 'src/app/models/Auther';
import { Subject } from 'rxjs';

@Component({
  selector: 'author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authers: Auther[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj;
  isUpdate: boolean = false;
  autherId;
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

    this.libraryService.getAuthers().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.authers.push(result[i]);
        this.totalRecords += 1;
      }
      this.dtTrigger.next();
      
    });

  }

  addWindowOpen(popupElement) {
    this.updateObj = {};
    this.inserted = false;
    this.updated = false;
    this.error = false;
    this.modelService.open(popupElement, { centered: true, scrollable: true });
  }

  addOrUpdate(addForm: NgForm) {
    this.inserted = false;
    this.updated = false;
    this.error = false;

    console.log(addForm.value);

    if (!this.isUpdate) {
      this.tempObj = {
        name: addForm.value.autherName,
        TP: addForm.value.TP,
        address: addForm.value.address
        
      };

      this.libraryService.addAuther(this.tempObj).subscribe(result => {
        if (result == "success") {
          this.authers.push(this.tempObj);
          addForm.resetForm();
          this.totalRecords++;
          this.modelService.dismissAll();
        } else {
          this.error = true;
        }
      });


    } else if (this.isUpdate) {
      this.tempObj = {
        autherId: this.autherId,
        name: addForm.value.autherName,
        TP: addForm.value.TP,
        address: addForm.value.address
        
      };
      console.log(addForm.value);

      this.libraryService.updateAuther(this.tempObj).subscribe(result => {

        if (result == "success") {
          this.isUpdate = false;
          addForm.resetForm();
          this.modelService.dismissAll();

          for (let i in this.authers) {
            if (this.authers[i].autherId == this.tempObj.autherId) {
              this.authers[i] = this.tempObj;
            }
          }

        } else {
          this.error = true;
        }
      });
    }
  }

  updateBtn(auther, popupElement) {
    this.autherId = auther.autherId;
    this.isUpdate = true;
    this.inserted = false;
    this.updated = false;
    this.error = false;

    this.updateObj = {
      autherId: auther.autherId,
      autherName: auther.name,
      TP: auther.TP,
      address: auther.address,
    };

    this.modelService.open(popupElement, { centered: true, scrollable: true });

  }

  deleteWindowOpen(deleteObj, popupElement) {
    this.isDeleted = false;
    this.autherId = deleteObj.autherId;

    this.modelService.open(popupElement);

  }

  delete() {
    this.isDeleted = false;

    console.log(this.autherId);

    this.libraryService.deleteAuther(this.autherId).subscribe(result => {

      if (result == "success") {
        this.isDeleted = false;

        for (let i in this.authers) {

          if (this.authers[i].autherId == this.autherId) {
            this.authers.splice(parseInt(i), 1);
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
