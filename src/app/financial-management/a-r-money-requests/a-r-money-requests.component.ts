import { Component, OnInit } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { MoneyRequest } from 'src/app/models/MoneyRequestF';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'a-r-money-requests',
  templateUrl: './a-r-money-requests.component.html',
  styleUrls: ['./a-r-money-requests.component.css']
})
export class ARMoneyRequestsComponent implements OnInit {
  mRequests: MoneyRequest[] = [];
  filteredMRequests: MoneyRequest[] = [];
  popoverObj = {};
  tempRecord: MoneyRequest;

  constructor(private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {
    this.financialService.getMRequests().subscribe(result => {
      // console.log(result);
      for(let r in result){
        this.mRequests.push(result[r]);
        this.filteredMRequests.push(result[r]);
      }

    });
  }

  filter(key: string){
    this.filteredMRequests = [];
    let tempArray: MoneyRequest[] = [];

    if(key == "all"){
      tempArray = this.mRequests;
    }else{
      for(let i in this.mRequests){
        if(this.mRequests[i].status == key){
          tempArray.push(this.mRequests[i]);
        }
      }
    }
    this.filteredMRequests = tempArray;
    
  }

  mrAction(req: MoneyRequest, popoverContent){
    // console.log(req);
    this.tempRecord = req;

    this.popoverObj = {
      empName: req.empName,
      date: req.date,
      amount: req.amount,
      description: req.description,
    };

    this.modelService.open(popoverContent, { centered: true });

  }

  accept(){

    for(let i in this.filteredMRequests){
      if(this.filteredMRequests[i].moneyRequestId == this.tempRecord.moneyRequestId){
        this.filteredMRequests[i].status = "accepted";
      }
    }

    this.financialService.acceptOrRejectMRequest(this.tempRecord.moneyRequestId, "accept");
    this.modelService.dismissAll();
  }

  reject(){

    for(let i in this.filteredMRequests){
      if(this.filteredMRequests[i].moneyRequestId == this.tempRecord.moneyRequestId){
        this.filteredMRequests[i].status = "rejected";
      }
    }

    this.financialService.acceptOrRejectMRequest(this.tempRecord.moneyRequestId, "reject");
    this.modelService.dismissAll();
  }

}
