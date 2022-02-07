import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastr: ToastrService) { }

  showSuccess(code: string, description: string) {
    this.toastr.success(description, code, {
      timeOut: 3000,
    });
  }
  showError(code: string, description: string) {
    this.toastr.error(description, code, {
      timeOut: 3000,
    });
  }
  showInfo(code: string, description: string) {
    this.toastr.info(description, code, {
      timeOut: 3000,
    });
  }
  showWarning(code: string, description: string) {
    this.toastr.warning(description, code, {
      timeOut: 3000,
    });
  }
}
