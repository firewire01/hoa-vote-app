import { DatePipe, NgStyle } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContainerComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent, FormCheckComponent, FormCheckInputDirective, DropdownComponent, DropdownModule } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { BodChkDirective } from 'src/app/_directive/bodchk.directive';
import { CandidateService } from 'src/app/_service/candidate.service';
import { CandidateDto } from 'src/app/objects/candidate-dto';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { VoteDTO, VoterDto, VoterService } from 'src/app/_service/voter.service';
import { BASE_API, StorageService } from 'src/app/_service/storage.service';


@Component({
  selector: 'app-admin-view',
  standalone: true,
  providers : [DatePipe],
  imports: [ContainerComponent, WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, 
    GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent,
    ChecksRadiosComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, RouterModule,
    IconDirective , DropdownComponent, DropdownModule, DatePipe ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {

  public bods : CandidateDto[];

  public grievances : CandidateDto[];

  defaultPic = '../../../../assets/images/avatars/prof.jpg'

  bodVotes = new VoteDTO(0, []);

  grievanceVotes = new VoteDTO(0, []);

  users : VoterDto[];

  @ViewChildren(BodChkDirective) bodChks: QueryList<BodChkDirective>;

  @ViewChildren("gvChk") gvChks: QueryList<BodChkDirective>;

  constructor(private candidateService: CandidateService, private voterService: VoterService,
     private store: StorageService, private router: Router
  ) { 
    console.log("here");
    this.store.routedAdmin();
  }

  ngOnInit(): void {
    // if(localStorage.getItem('BOD_VOTE'))
   

    this.bodVotes = localStorage.getItem('BOD_VOTE') ? 
    JSON.parse(String(localStorage.getItem('BOD_VOTE'))) 
    : new VoteDTO(0, []);

    this.grievanceVotes = localStorage.getItem('GV_VOTE') ? 
    JSON.parse(String(localStorage.getItem('GV_VOTE'))) 
    : new VoteDTO(0, []);

    console.log(this.bodVotes)
    console.log(this.grievanceVotes)

    this.candidateService.buildDtOptions(BASE_API + '/candidate?type=BOD').subscribe(data => {
      this.bods = data;
    });

    this.candidateService.buildDtOptions(BASE_API + '/candidate?type=GRIEVANCE')
    .subscribe(data => this.grievances = data);

    this.voterService.getUsers()
    .subscribe(data => this.users = data);

  }

  ngAfterViewInit() {
    //Copy in all the js code from the script.js. Typescript will complain but it works just fine
    this.uncheckAll();
  }

  uncheckAll() {
    
    this.bodVotes.candidates.forEach(el =>{
      this.bodChks.forEach(element =>{
        element.checkBox(el);
      });
    });
      

    
    // if(this.grievanceVotes && this.grievanceVotes.candidates){
    //   this.grievanceVotes.candidates.forEach(element => {
    //     this.gvChks.forEach((element) => {
    //       if(element.nativeElement.id == element) {
    //         element.nativeElement.checked = true;
    //       };
    //    });
    //   });
    // }
    

  }

  ngOnDestroy(): void {
    localStorage.setItem('BOD_VOTE', JSON.stringify(this.bodVotes))
    localStorage.setItem('GV_VOTE', JSON.stringify(this.grievanceVotes))
  }

  checkBodChange(event:any){ 
    let id = Number(event.target.id);

    if(!event.target.checked && this.bodVotes.candidates
      .includes(id)){
        this.bodVotes.candidates.splice(
          this.bodVotes.candidates.indexOf(id), 1);
    }else{
      if(this.bodVotes.candidates.length > 4 ){
        alert("You can only vote 5 BOD.");
        event.target.checked = false;
      }else{
        if(!this.bodVotes.candidates
          .includes(id))
        this.bodVotes.candidates.push(id);
      }
    }
    
    // this.console.log(this.bodVotes);
  }

  checkGVChange(event:any){ 
    let id = Number(event.target.id);

    if(!event.target.checked && this.grievanceVotes.candidates
      .includes(id)){
        this.grievanceVotes.candidates.splice(
          this.grievanceVotes.candidates.indexOf(id), 1);
    }else{
      if(this.grievanceVotes.candidates.length > 2 ){
        alert("You can only vote 3 Grievance.");
        event.target.checked = false;
      }else{
        if(!this.grievanceVotes.candidates
          .includes(id))
        this.grievanceVotes.candidates.push(id);
      }
    }
    
    // this.console.log(this.bodVotes);
  }

  update(id:number){
    alert("yes");
  }

  showTemp(event: Event){
    alert("yes");
  }


}
