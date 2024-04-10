import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../../Shared/models/user.model';
import { UserManagementService } from '../../services/user-management.service';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Roles } from '../../../Shared/models/roles';
import { Categories } from '../../../Shared/models/categories';
import { TitleCasePipe, KeyValuePipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { SnackbarService } from '../../../Shared/services/snackbar.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    TitleCasePipe,
    KeyValuePipe,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
//This component is used for Adding, Updating and Viewing User Details
export class UserManagementComponent implements OnInit {
  mode = 'view';
  user!: UserModel;
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    role: new FormControl(null, [Validators.required]),
    category: new FormControl(null),
    created: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    lastUpdated: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
  });
  roles = Roles;
  categories = Categories;

  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    const mode = this.route.snapshot.queryParams['mode'];
    this.mode = mode ? mode : this.mode;
    if (this.mode == 'view' || this.mode == 'edit') {
      this.user = this.userManagementService.getUser();
      this.userForm.patchValue(this.user);
      this.userForm.controls['email'].disable();
    } else {
      
    }
  }

  get formControls() {
    return this.userForm.controls;
  }

  onSubmit(form: FormGroupDirective) {
    if(this.mode=="add") {
      this.userManagementService.addUser(this.userForm.value).subscribe({
        next: (res: any)=>{
          this.snackbarService.show('right', 'top', res.message);
          this.userForm.reset();
          form.resetForm();
        }
      });
    }
  }
}
