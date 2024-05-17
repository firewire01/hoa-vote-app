import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, ColComponent, ColDirective, ContainerComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormModule, InputGroupComponent, InputGroupTextDirective, ListGroupModule, NavbarComponent, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { ImageFile } from '../../../objects/file-dto';
import { CandidateDto } from '../../../objects/candidate-dto';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/_service/candidate.service';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,
    ChecksRadiosComponent, FormCheckComponent , NavbarComponent, FormModule, ReactiveFormsModule, NgFor, ColDirective,  NgIf, FormFeedbackComponent, FormCheckInputDirective, FormCheckLabelDirective, 
    ButtonGroupComponent, ButtonDirective, TextColorDirective, CardComponent, NgClass, CardBodyComponent, NgFor, JsonPipe, ListGroupModule
    , RouterModule 
  ],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss'
})
export class CandidateComponent implements OnInit {

  imagePath = new ImageFile('');

  defaultPic = '../../../../assets/images/avatars/prof.jpg'

  candidateDto: CandidateDto;

  candidateId = 0;

  constructor(private activatedRoute: ActivatedRoute, private candidateS : CandidateService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.candidateId = params['id'];
      });
    
    this.candidateS.getCandidate(this.candidateId).subscribe(data=>{
      this.candidateDto = data;
      
      if(this.candidateDto.fileDTO && this.candidateDto.fileDTO.base64)
         this.candidateDto.file64 = this.candidateDto.fileDTO.base64;
      else{
        this.candidateDto.file64 = this.defaultPic;
      }

    })


  }

}
