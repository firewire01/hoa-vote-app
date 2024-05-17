import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ContainerComponent, FormCheckComponent, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, NavbarComponent, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoterDto, VoterService } from '../../../_service/voter.service';
import { RouterModule } from '@angular/router';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-voter-add',
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,
    ChecksRadiosComponent, FormCheckComponent , NavbarComponent,  FormsModule, RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './voter-add.component.html',
  styleUrl: './voter-add.component.scss'
})
export class VoterAddComponent {

  acceptedFileFormat = ['xlsx',
  'xls'];
  
  voterForm = this.formBuilder.group({
    fname: '',
    lname: '',
    blk: 1,
    lot: 1,
    email: '',
    mig: false
  });

  bulkForm = this.formBuilder.group({
    file: '',
    type: '',
  });

  maxfileSize = 15000000;

  bulkfile = null;

  @ViewChild('myFile')
  myInputVariable: ElementRef;

  constructor(private formBuilder: FormBuilder, private voterService: VoterService, 
    private store: StorageService) { 

    store.routedAdmin();

  }

  onSubmit(){
    console.log(this.voterForm.value)
    this.voterService.addVoter(this.voterForm.value as VoterDto).subscribe(data=>{
      alert("Successfully save voter: ");
      console.log(data);
      this.voterForm.reset();
      this.voterForm.get('blk')?.patchValue(1);
    
      this.voterForm.get('lot')?.patchValue(1);
    }, error=>{
      alert("Error: " + error.message);
      console.log(error.message);
    });

  }

  bulkSubmit(){
    if(this.bulkfile){
      this.voterService.bulkInsert(this.bulkfile).subscribe(data=>{
        alert("Successfully save voters: ");
        console.log(data.message);

      },
      error=>{
        alert("Error: " + error.message);
        console.log(error.message);
      })
    }

    this.myInputVariable.nativeElement.value = "";
    
  }

  onFileChange(even: any){
    const file = even.target.files[0];
    if(this.acceptedFileFormat.includes(file.name.split('.').pop()) && 
    file.size < this.maxfileSize){
      this.bulkfile = even.target.files[0];
    }else{
      alert("FIle not supported.")
      this.myInputVariable.nativeElement.value = "";
    }
  
  }

}
