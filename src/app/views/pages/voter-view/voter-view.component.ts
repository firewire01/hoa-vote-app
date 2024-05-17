import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupModule, ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { VoterDto, VoterService } from 'src/app/_service/voter.service';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { data } from 'jquery';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-voter-view',
  standalone: true,
  providers : [DatePipe],
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent,
    InputGroupTextDirective, IconDirective, FormControlDirective, RouterModule, FormsModule,
     ReactiveFormsModule, DatePipe, ChecksRadiosComponent, FormCheckComponent , FormCheckInputDirective, FormCheckLabelDirective, 
     ButtonGroupModule,  
     ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent
   ],
  templateUrl: './voter-view.component.html',
  styleUrl: './voter-view.component.scss'
})
export class VoterViewComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private voterService:
     VoterService, private activatedRoute: ActivatedRoute, private router: Router, 
    private store : StorageService){
     
      store.toLogIn();

     }

  userId = 0;

  role = '';
  
  voterForm = this.formBuilder.group({
    id: 0,
    fname: '',
    lname: '',
    blk: 1,
    lot: 1,
    age: 0,
    email: '',
    migs: false, 
    directMember: false,
    username: '',
    tempPassword: '',
    password: '',
    status: '',
    activatedDate: '',
    lastLogin: '',
    votedDate: ''
  });




  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      });
    
      this.voterService.getUser(this.userId).subscribe(data =>{
        this.voterForm.get('id')?.patchValue(data.id);
        this.voterForm.get('fname')?.patchValue(data.fname);
        this.voterForm.get('lname')?.patchValue(data.lname);
        this.voterForm.get('blk')?.patchValue(data.blk);
        this.voterForm.get('lot')?.patchValue(data.lot);
        this.voterForm.get('age')?.patchValue(data.age);
        this.voterForm.get('email')?.patchValue(data.email);
        this.voterForm.get('migs')?.patchValue(data.migs);
        this.voterForm.get('directMember')?.patchValue(data.directMember);
        this.voterForm.get('username')?.patchValue(data.username);
        this.voterForm.get('tempPassword')?.patchValue(data.tempPassword);
        this.voterForm.get('status')?.patchValue(data.status);
        this.voterForm.get('activatedDate')?.patchValue(data.activatedDate);
        this.voterForm.get('lastLogin')?.patchValue(data.lastLogin);
        this.voterForm.get('votedDate')?.patchValue(data.votedDate);
        let ctr = 0;
        data.roles.forEach(d =>{
          if(ctr > 0){
            this.role + ', ';
          }
          this.role = this.role + (d.name);
          ctr++;
        })

      },error=>{
        alert(error.message);
        
      });

    
  }

  onSubmit(){
    const voteDto = this.voterForm.value as VoterDto;
    this.voterService.updateVoter(voteDto).subscribe(data => console.log("Update successfull."));
    window.location.reload();
  }

  public visible = false;
  public modalTittle = '';
  public modalMessage = '';
  public buttonMessage = '';
  public buttonAction = '';

  buttonClose() {
    this.visible = !this.visible;
  }

  taggleDelete() {
    this.visible = !this.visible;
    this.modalTittle = 'Delete';
    this.buttonMessage = 'Delete';
    this.modalMessage = 'Are you sure you want to permanently delete the user/voter?';
    this.buttonAction = 'deleteButton';
  }


  onClick(){
    const id =  this.voterForm.get('id')?.value;
    if(this.buttonAction == 'deleteButton'){
      this.voterService.deleteVoter(id).subscribe(data => console.log(data.message)
      );
      this.router.navigate(['/admin-view']);

    }else if(this.buttonAction == 'resetButton'){
      this.voterService.resetVoter(id).subscribe(data => console.log(data.message)
      );
      window.location.reload();
    }else{
      console.log('No Action taken');
    }
    this.visible = !this.visible;
  }


  taggleReset() {
    this.visible = !this.visible;
    this.modalTittle = 'Reset User';
    this.buttonMessage = 'Reset';
    this.modalMessage = 'Are you sure you want to reset the user? Resetting will reset the password and change the temporary password. You can\'t reset if the voter has already voted.';
    this.buttonAction = 'resetButton';
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }


}
