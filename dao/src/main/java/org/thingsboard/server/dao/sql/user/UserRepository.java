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
package org.thingsboard.server.dao.sql.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.thingsboard.server.common.data.security.Authority;
import org.thingsboard.server.dao.model.sql.UserEntity;

import java.util.UUID;

/**
 * @author Valerii Sosliuk
 */
public interface UserRepository extends PagingAndSortingRepository<UserEntity, UUID> {

    UserEntity findByEmail(String email);

    @Query("SELECT u FROM UserEntity u WHERE u.tenantId = :tenantId " +
            "AND u.customerId = :customerId AND u.authority = :authority " +
            "AND LOWER(u.searchText) LIKE LOWER(CONCAT(:searchText, '%'))")
    Page<UserEntity> findUsersByAuthority(@Param("tenantId") UUID tenantId,
                                          @Param("customerId") UUID customerId,
                                          @Param("searchText") String searchText,
                                          @Param("authority") Authority authority,
                                          Pageable pageable);

/* THERA BEGIN */
     @Query("SELECT u FROM UserEntity u WHERE u.tenantId = :tenantId " +
            "AND u.customerId = :customerId AND (u.authority = :authority1 " +
            "OR u.authority = :authority2) " +
            "AND LOWER(u.searchText) LIKE LOWER(CONCAT(:searchText, '%'))")
     Page<UserEntity> findUsersByAuthority2(@Param("tenantId") UUID tenantId,
                                            @Param("customerId") UUID customerId,
                                            @Param("searchText") String searchText,
                                            @Param("authority1") Authority authority1,
                                            @Param("authority2") Authority authority2,
                                            Pageable pageable);


        @Query("SELECT u FROM UserEntity u WHERE u.tenantId = :tenantId " +
                "AND u.customerId = :customerId AND (u.authority = :authority1 " +
                "OR u.authority = :authority2 OR u.authority = :authority3) " +
                "AND LOWER(u.searchText) LIKE LOWER(CONCAT(:searchText, '%'))")
        Page<UserEntity> findUsersByAuthority3(@Param("tenantId") UUID tenantId,
                                                @Param("customerId") UUID customerId,
                                                @Param("searchText") String searchText,
                                                @Param("authority1") Authority authority1,
                                                @Param("authority2") Authority authority2,
                                                @Param("authority3") Authority authority3,
                                                Pageable pageable);                                            
/* THERA END */                                            

    @Query("SELECT u FROM UserEntity u WHERE u.tenantId = :tenantId " +
            "AND LOWER(u.searchText) LIKE LOWER(CONCAT(:searchText, '%'))")
    Page<UserEntity> findByTenantId(@Param("tenantId") UUID tenantId,
                                    @Param("searchText") String searchText,
                                    Pageable pageable);

    Long countByTenantId(UUID tenantId);
}
