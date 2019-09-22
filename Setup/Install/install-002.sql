
-- update ajax filter reload
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'listingMode'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 's:18:"filter_ajax_reload";'
ON DUPLICATE KEY UPDATE
    `value` = 's:18:"filter_ajax_reload";';

-- seo refresh only manuel
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'seoRefreshStrategy'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'i:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'i:1;';

-- search refresh only manual
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'searchRefreshStrategy'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'i:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'i:1;';

-- sitemap refresh only manual
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'sitemapRefreshStrategy'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'i:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'i:1;';

-- disable article navigation
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'disableArticleNavigation'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'b:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'b:1;';

-- topseller refresh manually
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'topSellerRefreshStrategy'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'i:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'i:1;';

-- similar articles refresh manually
SET @elementId = (
    SELECT s_core_config_elements.id
    FROM s_core_config_elements
    WHERE s_core_config_elements.name = 'similarRefreshStrategy'
);

INSERT INTO s_core_config_values
SET element_id = @elementId,
    shop_id = 1,
    `value` = 'i:1;'
ON DUPLICATE KEY UPDATE
    `value` = 'i:1;';
