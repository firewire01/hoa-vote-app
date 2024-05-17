import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatePassDto, VoterService } from 'src/app/_service/voter.service';
import { data } from 'jquery';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, InputGroupComponent,
       InputGroupTextDirective, IconDirective, ButtonDirective, RouterModule, 
       FormsModule, FormDirective, FormControlDirective, ReactiveFormsModule
      ]
})

export class RegisterComponent {

  registerForm = this.formBuilder.group({
    username: '',
    email: '',
    temppass: '',
    password: '',
    repeatpassword: ''
  });


  constructor(private formBuilder: FormBuilder, private voterService: VoterService, private router: Router) { }

  onSubmit(){
    const newPass = this.registerForm.get('password')?.value;
    const repeatPasss = this.registerForm.get('repeatpassword')?.value;

    if(!(newPass == repeatPasss)){
      alert('Password and repeat password does not match');
    }else{
      console.log(this.registerForm.value);
    }
    
    this.voterService.updatePass((this.registerForm.value as UpdatePassDto)).subscribe(data=>{
      alert('User Activited successfull.');

      this.registerForm.reset();

      console.log(data.message);

      this.router.navigate(['/login']);

    }, error=>{
      alert('User Activited error.');

      console.log(error.message);
    });

  }

}
