
-- articles per page
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'articlesperpage'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 's:2:"30";'
ON DUPLICATE KEY UPDATE
    `value` = 's:2:"30";';

-- ...
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'numberarticlestoshow'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 's:2:"30";'
ON DUPLICATE KEY UPDATE
    `value` = 's:2:"30";';

-- ...
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'categorytemplates'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 's:73:"listing_3column.tpl:3-Spalten Layout;listing_4column.tpl:4-Spalten Layout";'
ON DUPLICATE KEY UPDATE
    `value` = 's:73:"listing_3column.tpl:3-Spalten Layout;listing_4column.tpl:4-Spalten Layout";';

-- ...
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'categorydetaillink'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'b:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'b:1;';
