///
/// Copyright © 2016-2021 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import { FormGroup } from '@angular/forms';
import { UserComponent } from '@modules/home/pages/user/user.component';
import { Authority } from '@shared/models/authority.enum';
import { AuthUser, ActivationMethod, activationMethodTranslations, User, TenantUserProfile, tenantuserProfileTranslations, CustomerUserProfile, customeruserProfileTranslations } from '@shared/models/user.model';
import { CustomerId } from '@shared/models/id/customer-id';
import { UserService } from '@core/http/user.service';
import { Observable } from 'rxjs';
import {
  ActivationLinkDialogComponent,
  ActivationLinkDialogData
} from '@modules/home/pages/user/activation-link-dialog.component';
import { TenantId } from '@app/shared/models/id/tenant-id';
import { DialogComponent } from '@shared/components/dialog.component';
import { Router } from '@angular/router';
import { getCurrentAuthUser } from '@core/auth/auth.selectors';

export interface AddUserDialogData {
  tenantId: string;
  customerId: string;
  authority: Authority;
}

@Component({
  selector: 'tb-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent extends DialogComponent<AddUserDialogComponent, User> implements OnInit {

  detailsForm: FormGroup;
  user: User;
  private readonly authUser: AuthUser;

  activationMethods = Object.keys(ActivationMethod);
  activationMethodEnum = ActivationMethod;

  activationMethodTranslations = activationMethodTranslations;

  activationMethod = ActivationMethod.DISPLAY_ACTIVATION_LINK;

/* THERA BEGIN */

  tenantUserProfiles = Object.keys(TenantUserProfile);
  tenantUserProfileEnum = TenantUserProfile;
  tenantuserProfileTranslations = tenantuserProfileTranslations;
  tenantUserProfile = TenantUserProfile.TENANT_ADMIN;

  customerUserProfiles = Object.keys(CustomerUserProfile);
  customerUserProfileEnum = CustomerUserProfile;
  customeruserProfileTranslations = customeruserProfileTranslations;
    
  customerUserProfile = CustomerUserProfile.CUSTOMER_USER;
/* THERA END */

  @ViewChild(UserComponent, {static: true}) userComponent: UserComponent;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              @Inject(MAT_DIALOG_DATA) public data: AddUserDialogData,
              public dialogRef: MatDialogRef<AddUserDialogComponent, User>,
              private userService: UserService,
              private dialog: MatDialog) {
    super(store, router, dialogRef);
    this.authUser = getCurrentAuthUser(this.store);
  }

  ngOnInit(): void {
    this.user = {} as User;
    this.userComponent.isEdit = true;
    this.userComponent.entity = this.user;
    this.detailsForm = this.userComponent.entityForm;
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  add(): void {
    if (this.detailsForm.valid) {
      this.user = {...this.user, ...this.userComponent.entityForm.value};
      //this.user.authority = this.data.authority;
      /* THERA BEGIN*/
      if (this.isSysAdmin())
      {
        switch (this.tenantUserProfile) {
          case 'TENANT_ADMIN':
            this.user.authority = Authority.TENANT_ADMIN;
            break;
          case 'TENANT_INTEGRA':
            this.user.authority = Authority.TENANT_INTEGRA;
            break;
          case 'TENANT_INSTALL':          
            this.user.authority = Authority.TENANT_INSTALL;
            break;
        }
      } else
      {
        switch (this.customerUserProfile) {
          case 'CUSTOMER_USER':
            this.user.authority = Authority.CUSTOMER_USER;
            break;
            case 'CUSTOMER_READO':
              this.user.authority = Authority.CUSTOMER_READO;
              break;   
          }
      }
      /* THERA END*/
      this.user.tenantId = new TenantId(this.data.tenantId);
      this.user.customerId = new CustomerId(this.data.customerId);
      const sendActivationEmail = this.activationMethod === ActivationMethod.SEND_ACTIVATION_MAIL;
      this.userService.saveUser(this.user, sendActivationEmail).subscribe(
        (user) => {
          if (this.activationMethod === ActivationMethod.DISPLAY_ACTIVATION_LINK) {
            this.userService.getActivationLink(user.id.id).subscribe(
              (activationLink) => {
                this.displayActivationLink(activationLink).subscribe(
                  () => {
                    this.dialogRef.close(user);
                  }
                );
              }
            );
          } else {
            this.dialogRef.close(user);
          }
        }
      );
    }
  }

  isSysAdmin(): boolean {
    return this.authUser.authority === Authority.SYS_ADMIN;
  }

  displayActivationLink(activationLink: string): Observable<void> {
    return this.dialog.open<ActivationLinkDialogComponent, ActivationLinkDialogData,
      void>(ActivationLinkDialogComponent, {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        activationLink
      }
    }).afterClosed();
  }
}
