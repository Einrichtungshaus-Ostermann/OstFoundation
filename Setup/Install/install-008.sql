
-- disable garbage collection
UPDATE s_media_album
SET garbage_collectable = 0;

-- enable for article album
UPDATE s_media_album
SET garbage_collectable = 1
WHERE id = -1;

-- set thumbnail sizes
UPDATE s_media_album_settings
SET thumbnail_size = '300x300;600x600;1280x1280'
WHERE albumID = -1;
