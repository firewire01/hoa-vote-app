import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, ColComponent, ColDirective, ContainerComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormModule, InputGroupComponent, InputGroupTextDirective, NavbarComponent, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidateDto } from '../../../objects/candidate-dto';
import { FileDTO } from '../../../objects/file-dto';
import { Observable } from 'rxjs';
import { data, error } from 'jquery';
import { ViewChild } from '@angular/core';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { StorageService } from 'src/app/_service/storage.service';
import { CandidateService } from 'src/app/_service/candidate.service';

interface Indutry{
  val: string,
  value: string
}

@Component({
  selector: 'app-candidate-add',
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,
    ChecksRadiosComponent, FormCheckComponent , FormCheckInputDirective, FormCheckLabelDirective,  NavbarComponent, FormModule, ReactiveFormsModule, NgFor, ColDirective,  NgIf, FormFeedbackComponent, 
    ButtonGroupComponent, ButtonDirective, TextColorDirective, CardComponent, NgClass, CardBodyComponent, NgFor, JsonPipe,

    RouterModule
  ],
  templateUrl: './candidate-add.component.html',
  styleUrl: './candidate-add.component.scss'
})
export class CandidateAddComponent implements OnInit{

  canidateForm = this.formBuilder.group({
    fname: '',
    mname: '',
    lname: '',
    blk: 1,
    lot: 1,
    email: '',
    contactNumber: '',
    mig: true,
    candidateType: 'BOD',
    age: 1,
    yearsInHoa: 0,
    yearsInMarried: 0,
    siblings: 0,
    facebook: '',
    linkedin: '',
    profilePic: undefined,
    incumbent: false,
    industry : '',
    introStatements: this.formBuilder.array([]) ,
    goals: this.formBuilder.array([]) ,
    relevantActivities: this.formBuilder.array([]),
    lastPosition: '',
    currentJob: ''
  });

  file: any;

  resultbase64: any;

  valid = true;

  public industries : Indutry[] = [
    { val: 'Information_Technology', 
    value: 'Information Technology (IT)'
    },
    { val: 'Tech', 
    value: 'Tech'
    },
    { val: 'Healthcare', 
    value: 'Healthcare'
    },
    { val: 'Education', 
    value: 'Education'
    },
    { val: 'Accounting', 
    value: 'Accounting'
    },
    { val: 'Pharmaceutical', 
    value: 'Pharmaceutical'
    },
    { val: 'Finance', 
    value: 'Finance'
    },
    { val: 'Engineering', 
    value: 'Engineering'
    },
    { val: 'Real_Estate', 
    value: 'Real Estate'
    },
    { val: 'Higher_Education', 
    value: 'Higher Education'
    },
    { val: 'Sales', 
    value: 'Sales'
    },
    { val: 'Government', 
    value: 'Government'
    },
    { val: 'Energy', 
    value: 'Energy'
    },
    { val: 'Retail', 
    value: 'Retail'
    },
    { val: 'Manufacturing', 
    value: 'Manufacturing'
    },
    { val: 'Architecture', 
    value: 'Architecture'
    },
    { val: 'Human_Resources', 
    value: 'Human Resources'
    },
    { val: 'Nonprofit', 
    value: 'Nonprofit'
    },
    { val: 'Transportation', 
    value: 'Transportation'
    },
    { val: 'Hospitality',
    value: 'Hospitality'
    }
 ];

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  candidateId = null;

  constructor(
    private formBuilder: FormBuilder, private store: StorageService, 
     private activatedRoute: ActivatedRoute, private candidateService: CandidateService
  ) {

  }

  ngOnInit(): void {
    this.store.routedAdmin();

    this.activatedRoute.params.subscribe(params => {
      this.candidateId = params['id'];
      });
    
    if(this.candidateId){
        // this.can
    }
  }

  statements() : FormArray {  
    return this.canidateForm.get("introStatements") as FormArray  
  }  
     
  newStatement(): FormGroup {  
    return this.formBuilder.group({  
      description: ''  
    })  
  }  
     
  addStatement() {  
    
    if(this.statements().length > 2){
      alert("Statement limit is only 3.");
    }else{
      this.statements().push(this.newStatement()); 
    }
     
  }  

  removeStatement(i:number) {  
    this.statements().removeAt(i);  
  }
     
  removeGoal(i:number) {  
    this.goals().removeAt(i);  
  }
  
  goals() : FormArray {  
    return this.canidateForm.get("goals") as FormArray  
  }  
     
  newGoal(): FormGroup {  
    return this.formBuilder.group({  
      description: ''  
    })  
  }  
     
  addGoal() {  
    
    if(this.goals().length > 4){
      alert("Goals limit is only 5.");
    }else{
      this.goals().push(this.newGoal()); 
    }
     
  }  

  removeRelatedActivity(i:number) {  
    this.relatedActivities().removeAt(i);  
  }
  
  relatedActivities() : FormArray {  
    return this.canidateForm.get("relevantActivities") as FormArray  
  }  
     
  newRelatedActivity(): FormGroup {  
    return this.formBuilder.group({  
      description: ''  
    })  
  }  
     
  addRelatedActivity() {  
    
    if(this.relatedActivities().length > 4){
      alert("Related Activity limit is only 5.");
    }else{
      this.relatedActivities().push(this.newRelatedActivity()); 
    }
     
  }
     

  onSubmit(): void {
    // Process checkout data here

    console.log('Your order has been submitted', this.canidateForm.value);

    const value = this.canidateForm.value as CandidateDto;
    this.valid = true;
    value.fileDTO = new FileDTO(this.file,
      '',
      '')
    console.log('Your order has been submitted', value);

    this.candidateService.addCandidate(value).subscribe(data => {

      this.resetForm();
      alert("Save Candidate Successfull");
    }, error =>{
      console.error('error caught in component');
      console.error(error);
      alert("Error on creating candidate please contact Administrator.");
      this.valid = false;
    });
    
  }

  onFileChange(event: any){
    this.ReadAsBase64(event.target.files[0]).then(value =>{
      this.file = value;
  }, error =>{
    this.myInputVariable.nativeElement.value = "";
    this.file = null;
    alert(error);
  });
    
    // Here we use only the first file (single file)    
  }

  resetForm(){
    this.goals().clear();
    this.statements().clear();
    this.relatedActivities().clear();
    this.canidateForm.reset();
    this.canidateForm.get('blk')?.patchValue(1);
    this.myInputVariable.nativeElement.value = "";
    
    this.canidateForm.get('lot')?.patchValue(1);
    this.canidateForm.get('age')?.patchValue(1);
    this.canidateForm.get('mig')?.patchValue(true);
    this.canidateForm.get('incumbent')?.patchValue(false);
    this.canidateForm.get('yearsInHoa')?.patchValue(0);
    this.canidateForm.get('siblings')?.patchValue(0);
    this.canidateForm.get('yearsInMarried')?.patchValue(0);
    this.canidateForm.get('candidateType')?.patchValue('BOD');
 
  }

  async ReadAsBase64(file: File): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        const result = reader.result as String;
        if (!result) reject('Cannot read variable');
        if(!result.startsWith('data:image')) reject('File is not an Image.');
        if (file.size > 1937635) reject('File exceeds the 2 MB size limit.'); // Note: 2*2**20 = 2**21 
        resolve(reader.result);
      });

      reader.addEventListener('error', event => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }

}
