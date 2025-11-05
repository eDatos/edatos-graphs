-- ---------------------------------------------------------------------------------------------------
-- EDATOS-5138. Incluir api-key en llamadas a apis de edatos desde el e-graficos
-- "edatos.graphs.rest.api_key"
-- ---------------------------------------------------------------------------------------------------


insert into TB_DATA_CONFIGURATIONS (ID,VERSION,SYSTEM_PROPERTY,CONF_KEY,CONF_VALUE,EXTERNALLY_PUBLISHED) values(GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'),1,true,'edatos.graphs.rest.api_key','FILL_ME',true);
UPDATE TB_SEQUENCES SET SEQUENCE_NEXT_VALUE = SEQUENCE_NEXT_VALUE + 1 WHERE SEQUENCE_NAME = 'DATA_CONFIGURATIONS';

commit;