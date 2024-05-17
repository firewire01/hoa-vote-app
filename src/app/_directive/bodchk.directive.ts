import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'bodChk'
  })

  export class BodChkDirective {
    constructor(private belement: ElementRef) {}
  
    checkBox(id: number) {
      if(id == this.belement.nativeElement.id)
        this.belement.nativeElement.checked = true;
    }
  }