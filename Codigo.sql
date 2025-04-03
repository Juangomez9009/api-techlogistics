-- Generado por Oracle SQL Developer Data Modeler 24.3.1.351.0831
--   en:        2025-03-31 21:53:39 COT
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE Cliente 
    ( 
     id_cliente INTEGER  NOT NULL , 
     nombre     VARCHAR2 (200)  NOT NULL , 
     Correo     VARCHAR2 (100)  NOT NULL , 
     telefono   VARCHAR2 (20)  NOT NULL , 
     direccion  VARCHAR2 (150)  NOT NULL 
    ) 
;

ALTER TABLE Cliente 
    ADD CONSTRAINT Cliente_PK PRIMARY KEY ( id_cliente ) ;

CREATE TABLE DetallePedido 
    ( 
     id_detalle  INTEGER  NOT NULL , 
     id_pedido   INTEGER  NOT NULL , 
     id_producto INTEGER  NOT NULL , 
     cantidad    INTEGER  NOT NULL 
    ) 
;

ALTER TABLE DetallePedido 
    ADD CONSTRAINT DetallePedido_PK PRIMARY KEY ( id_detalle ) ;

CREATE TABLE EstadoEnvio 
    ( 
     id_estado   INTEGER  NOT NULL , 
     descripcion VARCHAR2 (100)  NOT NULL 
    ) 
;

ALTER TABLE EstadoEnvio 
    ADD CONSTRAINT EstadoEnvio_PK PRIMARY KEY ( id_estado ) ;

CREATE TABLE Pedido 
    ( 
     id_pedido                      INTEGER  NOT NULL , 
     id_cliente                     INTEGER  NOT NULL , 
     id_transportista               INTEGER  NOT NULL , 
     id_ruta                        INTEGER  NOT NULL , 
     fecha                          DATE  NOT NULL , 
     id_estado                      INTEGER  NOT NULL , 
     Cliente_id_cliente             INTEGER  NOT NULL , 
     Transportista_id_transportista INTEGER  NOT NULL , 
     Ruta_id_ruta                   INTEGER  NOT NULL , 
     EstadoEnvio_id_estado          INTEGER  NOT NULL , 
     DetallePedido_id_detalle       INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Pedido 
    ADD CONSTRAINT Pedido_PK PRIMARY KEY ( id_pedido ) ;

CREATE TABLE Producto 
    ( 
     id_producto              INTEGER  NOT NULL , 
     nombre                   VARCHAR2 (100)  NOT NULL , 
     descripcion              VARCHAR2 (200)  NOT NULL , 
     precio                   NUMBER (10,2)  NOT NULL , 
     DetallePedido_id_detalle INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Producto 
    ADD CONSTRAINT Producto_PK PRIMARY KEY ( id_producto ) ;

CREATE TABLE Ruta 
    ( 
     id_ruta INTEGER  NOT NULL , 
     origen  VARCHAR2 (100)  NOT NULL , 
     destino VARCHAR2 (100)  NOT NULL 
    ) 
;

ALTER TABLE Ruta 
    ADD CONSTRAINT Ruta_PK PRIMARY KEY ( id_ruta ) ;

CREATE TABLE Transportista 
    ( 
     id_transportista INTEGER  NOT NULL , 
     nombre           VARCHAR2 (100)  NOT NULL , 
     telefono         VARCHAR2 (20)  NOT NULL , 
     empresa          VARCHAR2 (100)  NOT NULL 
    ) 
;

ALTER TABLE Transportista 
    ADD CONSTRAINT Transportista_PK PRIMARY KEY ( id_transportista ) ;

ALTER TABLE Pedido 
    ADD CONSTRAINT Pedido_Cliente_FK FOREIGN KEY 
    ( 
     Cliente_id_cliente
    ) 
    REFERENCES Cliente 
    ( 
     id_cliente
    ) 
;

ALTER TABLE Pedido 
    ADD CONSTRAINT Pedido_DetallePedido_FK FOREIGN KEY 
    ( 
     DetallePedido_id_detalle
    ) 
    REFERENCES DetallePedido 
    ( 
     id_detalle
    ) 
;

ALTER TABLE Pedido 
    ADD CONSTRAINT Pedido_EstadoEnvio_FK FOREIGN KEY 
    ( 
     EstadoEnvio_id_estado
    ) 
    REFERENCES EstadoEnvio 
    ( 
     id_estado
    ) 
;

ALTER TABLE Pedido 
    ADD CONSTRAINT Pedido_Ruta_FK FOREIGN KEY 
    ( 
     Ruta_id_ruta
    ) 
    REFERENCES Ruta 
    ( 
     id_ruta
    ) 
;

ALTER TABLE Pedido 
    ADD CONSTRAINT Pedido_Transportista_FK FOREIGN KEY 
    ( 
     Transportista_id_transportista
    ) 
    REFERENCES Transportista 
    ( 
     id_transportista
    ) 
;

ALTER TABLE Producto 
    ADD CONSTRAINT Producto_DetallePedido_FK FOREIGN KEY 
    ( 
     DetallePedido_id_detalle
    ) 
    REFERENCES DetallePedido 
    ( 
     id_detalle
    ) 
;



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             7
-- CREATE INDEX                             0
-- ALTER TABLE                             13
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
