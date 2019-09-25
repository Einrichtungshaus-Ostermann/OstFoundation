
-- custom search facet
INSERT INTO `s_search_custom_facet` (`id`, `active`, `unique_key`, `display_in_categories`, `deletable`, `position`, `name`, `facet`) VALUES
(NULL, 1, NULL, 1, 1, 0, 'Lieferzeit', '{\"Shopware\\\\Bundle\\\\SearchBundle\\\\Facet\\\\ProductAttributeFacet\":{\"field\":\"attr12\",\"mode\":\"range\",\"formFieldName\":\"deliverytime\",\"label\":\"Lieferzeit\",\"template\":\"\",\"suffix\":\"Wochen\",\"digits\":0}}');
