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

import { UserService } from '@core/http/user.service'; //THERA
import { EntityType } from '@shared/models/entity-type.models'; //THERA
import {
  createLabelFromDatasource,
  deepClone,
  hashCode,
  isDefined,
  isNumber,
  isObject,
  isUndefined
} from '@core/utils'; //THERA

import { Injectable } from '@angular/core';
import { defaultHttpOptionsFromConfig, RequestConfig } from './http-utils';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageLink } from '@shared/models/page/page-link';
import { PageData } from '@shared/models/page/page-data';
import { Customer } from '@shared/models/customer.model';
import { UserId } from '@app/shared/public-api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private userService: UserService //THERA
  ) { }

  public getCustomers(pageLink: PageLink, config?: RequestConfig): Observable<PageData<Customer>> {
    return this.http.get<PageData<Customer>>(`/api/customers${pageLink.toQuery()}`,
      defaultHttpOptionsFromConfig(config));
  }

  public getCustomer(customerId: string, config?: RequestConfig): Observable<Customer> {
    return this.http.get<Customer>(`/api/customer/${customerId}`, defaultHttpOptionsFromConfig(config));
  }

  public saveCustomer(customer: Customer, config?: RequestConfig): Observable<Customer> {
    //THERA BEGIN
    //alert("SAVE CUSTOMER");
    //alert(JSON.stringify(customer));
    //alert(customer.integratorId);
    if(!isObject(customer.integratorId))
    {
      const idintegra = customer.integratorId.toString(); 
      const useridint = new UserId(idintegra);
      customer.integratorId = useridint;  
    }
    if(!isObject(customer.installerId))
    {
      const idinstall = customer.installerId.toString(); 
      const useridins = new UserId(idinstall);
      customer.installerId = useridins;  
    }

    // "integratorId":{"entityType":"USER","id":"7f229430-f94e-11eb-bddb-d5d4b6c54261"},
    // "installerId":"07f066b0-f9be-11eb-a9eb-a5e54d02994e"
    //THERA END
    return this.http.post<Customer>('/api/customer', customer, defaultHttpOptionsFromConfig(config));
  }

  public deleteCustomer(customerId: string, config?: RequestConfig) {
    return this.http.delete(`/api/customer/${customerId}`, defaultHttpOptionsFromConfig(config));
  }

}
