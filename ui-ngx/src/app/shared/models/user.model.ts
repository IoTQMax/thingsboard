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

import { BaseData } from './base-data';
import { UserId } from './id/user-id';
import { CustomerId } from './id/customer-id';
import { Authority } from './authority.enum';
import { TenantId } from './id/tenant-id';

export interface User extends BaseData<UserId> {
  tenantId: TenantId;
  customerId: CustomerId;
  email: string;
  authority: Authority;
  firstName: string;
  lastName: string;
  additionalInfo: any;
}

export enum ActivationMethod {
  DISPLAY_ACTIVATION_LINK = 'DISPLAY_ACTIVATION_LINK',
  SEND_ACTIVATION_MAIL = 'SEND_ACTIVATION_MAIL'
}

export const activationMethodTranslations = new Map<ActivationMethod, string>(
  [
    [ActivationMethod.DISPLAY_ACTIVATION_LINK, 'user.display-activation-link'],
    [ActivationMethod.SEND_ACTIVATION_MAIL, 'user.send-activation-mail']
  ]
);

/* THERA BEGIN */

export enum TenantUserProfile {
  TENANT_ADMIN = 'TENANT_ADMIN',
  TENANT_INTEGRA = 'TENANT_INTEGRA',
  TENANT_INSTALL = 'TENANT_INSTALL'
}

export enum CustomerUserProfile {
  CUSTOMER_USER = 'CUSTOMER_USER',
  CUSTOMER_READO = 'CUSTOMER_READO'
}

export const tenantuserProfileTranslations = new Map<TenantUserProfile, string>(
  [
    [TenantUserProfile.TENANT_ADMIN, 'user.tenant-admin-profile'],
    [TenantUserProfile.TENANT_INTEGRA, 'user.tenant-integra-profile'],
    [TenantUserProfile.TENANT_INSTALL, 'user.tenant-install-profile']
  ]
);

export const customeruserProfileTranslations = new Map<CustomerUserProfile, string>(
  [
    [CustomerUserProfile.CUSTOMER_USER, 'user.customer-user-profile'],
    [CustomerUserProfile.CUSTOMER_READO, 'user.customer-reado-profile']
  ]
);

/* THERA END */

export interface AuthUser {
  sub: string;
  scopes: string[];
  userId: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  tenantId: string;
  customerId: string;
  isPublic: boolean;
  authority: Authority;
}
