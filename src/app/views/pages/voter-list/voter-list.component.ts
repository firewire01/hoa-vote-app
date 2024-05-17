import { NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContainerComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, CardFooterComponent, GutterDirective, ProgressBarDirective, CardHeaderComponent, TableDirective, AvatarComponent, FormCheckComponent, FormCheckInputDirective, ProgressComponent, ProgressBarComponent, ProgressModule, ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalModule, ModalTitleDirective, ThemeDirective } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { CandidateService } from 'src/app/_service/candidate.service';
import { BASE_API, StorageService } from 'src/app/_service/storage.service';
import { ChecksRadiosComponent } from '../../forms/checks-radios/checks-radios.component';
import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { CandidateDto } from 'src/app/objects/candidate-dto';
import { ImageFile } from 'src/app/objects/file-dto';

@Component({
  selector: 'app-voter-list',
  standalone: true,
  imports: [ContainerComponent, WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, 
    GutterDirective, ProgressBarDirective, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent,
    ChecksRadiosComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, RouterModule
  ,ProgressComponent, ProgressBarComponent, ProgressModule, 
  ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective,
  ModalBodyComponent, ModalFooterComponent, ModalModule, NgFor],
  templateUrl: './voter-list.component.html',
  styleUrl: './voter-list.component.scss'
})
export class VoterListComponent implements OnInit {

  public bods : CandidateDto[];

  defaultPic = '../../../../assets/images/avatars/prof.jpg'

  constructor(private candidateService: CandidateService, private store: StorageService) { 
    store.toLogIn();
  }

  ngOnInit(): void {
    // if(localStorage.getItem('BOD_VOTE'))

    // console.log(this.store.getRoles());

    this.candidateService.buildDtOptions(BASE_API + '/candidate/voter/' 
    + this.store.getUser().id).subscribe(data => {
      this.bods = data;
    });
  
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
   
    if(this.candidateDto.fileDTO.base64){
      this.imagePath.file = this.candidateDto.fileDTO.base64;
    }else{
      this.imagePath.file = this.defaultPic;
    }

  }

}
