
-- disable backend hover
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'backendMenuOnHover'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'b:0;'
ON DUPLICATE KEY UPDATE
    `value` = 'b:0;';

-- set ajax timeout
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'ajaxTimeout'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'i:600;'
ON DUPLICATE KEY UPDATE
    `value` = 'i:600;';

-- set growl notifications to lower-left
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'growlMessageDisplayPosition'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 's:11:"bottom-left";'
ON DUPLICATE KEY UPDATE
    `value` = 's:11:"bottom-left";';
