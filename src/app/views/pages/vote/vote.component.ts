import { AfterViewInit, Component, Directive, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RowComponent, ColComponent, ButtonDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TextColorDirective, AvatarComponent, ButtonGroupComponent, CardFooterComponent, FormCheckLabelDirective, GutterDirective, ProgressBarDirective, ProgressComponent, TableDirective, ContainerComponent, FormCheckComponent, FormCheckInputDirective, ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ModalModule, ButtonGroupModule } from '@coreui/angular';
import { NgFor, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { CandidateDto } from '../../../objects/candidate-dto';
import { CandidateService } from '../../../_service/candidate.service';
import { VoteDTO } from '../../../_service/voter.service';
import { data } from 'jquery';
import { Router, RouterModule } from '@angular/router';
import { BodChkDirective } from '../../../_directive/bodchk.directive'
import { FileDTO, ImageFile } from 'src/app/objects/file-dto';
import { forEach } from 'lodash-es';
import { StorageService } from 'src/app/_service/storage.service';
import { VoterService } from 'src/app/_service/voter.service';

const BASE_API = 'http://localhost:8081/api/v1';

@Component({
  selector: 'app-vote',
  standalone: true,
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss',
  imports: [ContainerComponent, WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, 
    GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent,
    ChecksRadiosComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, RouterModule, 
    ButtonGroupModule,  NgFor, 
     ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective,
      ModalBodyComponent, ModalFooterComponent, ModalModule
  ]
})
export class VoteComponent implements OnInit  {

  public bods : CandidateDto[];

  public grievances : CandidateDto[];

  defaultPic = '../../../../assets/images/avatars/prof.jpg'

  bodVotes = new VoteDTO(0, []);

  grievanceVotes = new VoteDTO(0, []);

  @ViewChildren(BodChkDirective) bodChks: QueryList<BodChkDirective>;

  @ViewChildren("gvChk") gvChks: QueryList<BodChkDirective>;

  constructor(private candidateService: CandidateService, private storage: StorageService,
    private voterService: VoterService, private router : Router
  ) { 
    storage.routedUser();
  }

  ngOnInit(): void {
    // if(localStorage.getItem('BOD_VOTE'))

    this.candidateService.buildDtOptions(BASE_API + '/candidate?type=BOD').subscribe(data => {
      this.bods = data;
      this.bods.forEach(data=>{
        if(!data.fileDTO){
          data.file64 = this.defaultPic;
        }else{
          data.file64 = data.fileDTO.base64;
        }
      })
    });

    this.candidateService.buildDtOptions(BASE_API + '/candidate?type=GRIEVANCE')
    .subscribe(data => this.grievances = data);

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

  imagePath = new ImageFile('');

  candidateDto: CandidateDto;

  public visible = false;
  userId = 0;

  showdetails(id: number) {
    this.visible = !this.visible;
    this.userId = id;
    this.imagePath = new ImageFile('');
    console.log(this.userId);
  }
  showdetail() {
    this.visible = !this.visible;
  }

  detialsChange(event: any){
    this.visible = event;

    let boolean = false;

    this.bods.forEach(data=>{
      if(data.id == this.userId){
        this.candidateDto = data;
        boolean = true;
        return;
      }
    })

    if(!boolean){
      this.grievances.forEach(data=>{
        if(data.id == this.userId){
          this.candidateDto = data;
          return;
        }
      })
    }
   

    if(this.candidateDto.fileDTO.base64){
      this.imagePath.file = this.candidateDto.fileDTO.base64;
    }else{
      this.imagePath.file = this.defaultPic;
    }

  }

  submitVote(){
    const candidates = this.bodVotes;
    candidates.id = this.storage.getUser().id;

    this.grievanceVotes.candidates.forEach(f=>{
      candidates.candidates.push(f);
    })
    
    // bodVotes.
    this.voterService.submitVote(candidates
    ).subscribe(data=>{
      console.log("Success vote")
    },error=>{
      alert("Seems like you already voted. You cant vote twice.");
    }
    );

    this.router.navigate(['/voter-home']);

  }

}
