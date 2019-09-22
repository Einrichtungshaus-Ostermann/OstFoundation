
-- ...
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'votedisable'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'b:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'b:1;';
