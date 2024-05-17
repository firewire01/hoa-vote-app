import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContainerComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent, FormCheckComponent, FormCheckInputDirective, ProgressBarComponent, ProgressModule } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { CandidateService } from 'src/app/_service/candidate.service';
import { CandidateDto } from 'src/app/objects/candidate-dto';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { BASE_API, StorageService } from 'src/app/_service/storage.service';


@Component({
  selector: 'app-voter-home',
  standalone: true,
  imports: [ContainerComponent, WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, 
    GutterDirective, ProgressBarDirective, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent,
    ChecksRadiosComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, RouterModule
  ,ProgressComponent, ProgressBarComponent, ProgressModule],
  templateUrl: './voter-home.component.html',
  styleUrl: './voter-home.component.scss'
})
export class VoterHomeComponent implements OnInit {
  public bods : CandidateDto[];

  public grievances : CandidateDto[];

  defaultPic = '../../../../assets/images/avatars/prof.jpg'

  constructor(private candidateService: CandidateService, private store: StorageService) { 
    store.toLogIn();
  }

  ngOnInit(): void {
    // if(localStorage.getItem('BOD_VOTE'))

    console.log(this.store.getRoles());

    this.candidateService.buildDtOptions(BASE_API + '/candidate?type=BOD').subscribe(data => {
      this.bods = data;
      this.setColor(this.bods);
    });

    this.candidateService.buildDtOptions(BASE_API + '/candidate?type=GRIEVANCE')
    .subscribe(data => {
      this.grievances = data;
      this.setColor(this.grievances);
    }
    );
    

  }

  setColor(data: CandidateDto[]){
    data.forEach(d=>{
      if(d.percentile <= 10 ){
        d.color = 'light';
      }
      if(d.percentile <= 30 ){
        d.color = 'secondary';
      }
      if(d.percentile <= 40 ){
        d.color = 'warning';
      }
      if(d.percentile <= 50 ){
        d.color = 'info';
      }
      if(d.percentile <= 70 ){
        d.color = 'primary';
      }
      if(d.percentile <= 100 ){
        d.color = 'success';
      }

      console.log(d.color);
    })
    

  }

}
