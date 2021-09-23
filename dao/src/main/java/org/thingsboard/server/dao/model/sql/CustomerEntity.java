/**
 * Copyright © 2016-2021 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.thingsboard.server.dao.model.sql;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.thingsboard.server.common.data.Customer;
import org.thingsboard.server.common.data.id.CustomerId;

import org.thingsboard.server.common.data.id.UserId; //THERA
//import org.thingsboard.server.common.data.id.InstallerId;  //THERA

import org.thingsboard.server.common.data.id.TenantId;
import org.thingsboard.server.dao.model.BaseSqlEntity;
import org.thingsboard.server.dao.model.ModelConstants;
import org.thingsboard.server.dao.model.SearchTextEntity;
import org.thingsboard.server.dao.util.mapping.JsonStringType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@TypeDef(name = "json", typeClass = JsonStringType.class)
@Table(name = ModelConstants.CUSTOMER_COLUMN_FAMILY_NAME)
public final class CustomerEntity extends BaseSqlEntity<Customer> implements SearchTextEntity<Customer> {

    @Column(name = ModelConstants.CUSTOMER_TENANT_ID_PROPERTY)
    private UUID tenantId;
    
//THERA BEGIN INSTALLER & INTEGRATOR
    @Column(name = ModelConstants.CUSTOMER_INTEGRATOR_ID_PROPERTY)
    private UUID integratorId;

    @Column(name = ModelConstants.CUSTOMER_INSTALLER_ID_PROPERTY)
    private UUID installerId;
//THERA END INSTALLER & INTEGRATOR

    @Column(name = ModelConstants.CUSTOMER_TITLE_PROPERTY)
    private String title;
    
    @Column(name = ModelConstants.SEARCH_TEXT_PROPERTY)
    private String searchText;
    
    @Column(name = ModelConstants.COUNTRY_PROPERTY)
    private String country;
    
    @Column(name = ModelConstants.STATE_PROPERTY)
    private String state;

    @Column(name = ModelConstants.CITY_PROPERTY)
    private String city;

    @Column(name = ModelConstants.ADDRESS_PROPERTY)
    private String address;

    @Column(name = ModelConstants.ADDRESS2_PROPERTY)
    private String address2;

    @Column(name = ModelConstants.ZIP_PROPERTY)
    private String zip;

    @Column(name = ModelConstants.PHONE_PROPERTY)
    private String phone;

    @Column(name = ModelConstants.EMAIL_PROPERTY)
    private String email;

    @Type(type = "json")
    @Column(name = ModelConstants.CUSTOMER_ADDITIONAL_INFO_PROPERTY)
    private JsonNode additionalInfo;

    // public static final Map<String,String> CostumerColumnMap = new HashMap<>();
    // static {
    //     CostumerColumnMap.put("InstallerName", "c.title");
    //     CostumerColumnMap.put("IntegratorName", "p.name");
    // }

    // private String customerTitle;
    // private boolean customerIsPublic;
    // private String deviceProfileName;

    public CustomerEntity() {
        super();
    }

    public CustomerEntity(Customer customer) {
        if (customer.getId() != null) {
            this.setUuid(customer.getId().getId());
        }
        this.setCreatedTime(customer.getCreatedTime());
        this.tenantId = customer.getTenantId().getId();

        this.integratorId = customer.getIntegratorId().getId(); //THERA
        this.installerId = customer.getInstallerId().getId();   //THERA

        // this.IntegratorName = 'Hola';
        // this.InstallerName = 'Chau';

        this.title = customer.getTitle();
        this.country = customer.getCountry();
        this.state = customer.getState();
        this.city = customer.getCity();
        this.address = customer.getAddress();
        this.address2 = customer.getAddress2();
        this.zip = customer.getZip();
        this.phone = customer.getPhone();
        this.email = customer.getEmail();
        this.additionalInfo = customer.getAdditionalInfo();
    }

    @Override
    public String getSearchTextSource() {
        return title;
    }

    @Override
    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    @Override
    public Customer toData() {
        Customer customer = new Customer(new CustomerId(this.getUuid()));
        customer.setCreatedTime(createdTime);
        customer.setTenantId(new TenantId(tenantId));

        customer.setIntegratorId(new UserId(integratorId)); //THERA
        customer.setInstallerId(new UserId(installerId));    //THERA

        // customer.IntegratorName = 'Hola2';
        // customer.InstallerName = 'Chau2';

        customer.setTitle(title);
        customer.setCountry(country);
        customer.setState(state);
        customer.setCity(city);
        customer.setAddress(address);
        customer.setAddress2(address2);
        customer.setZip(zip);
        customer.setPhone(phone);
        customer.setEmail(email);
        customer.setAdditionalInfo(additionalInfo);
        return customer;
    }

}
