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



 
 /**
  * 
  QMAX
    |->Franquicia
	|-> Integrador = Genera los pedidos de instalación, asocia via mail al instalador para que proceda y genera el propietario.
	|-> Instalador = Da de alta y asocia los dispositivos de la instalación al propietario que le asignaron realizar la instalación. 
	|-> Propietarios = Genera usuarios dependientes, puede modificar el instalador y cortar el acceso a datos del integrador.
		|-> Usuarios = Pueden ver info y llegan alertas.

El propietario se tiene que dar de alta, asocia la franquicia de quien dio de alta los dispositivos o QMAX por default.
*/
package org.thingsboard.server.common.data.security;

public enum Authority {
    
    SYS_ADMIN(0),
    TENANT_ADMIN(1),
    CUSTOMER_USER(2),

    TENANT_INTEGRA(3),
    TENANT_INSTALL(4),
    CUSTOMER_READO(5),

    REFRESH_TOKEN(10);

    private int code;

    Authority(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static Authority parse(String value) {
        Authority authority = null;
        if (value != null && value.length() != 0) {
            for (Authority current : Authority.values()) {
                if (current.name().equalsIgnoreCase(value)) {
                    authority = current;
                    break;
                }
            }
        }
        return authority;
    }
}
