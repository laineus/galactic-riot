CREATE TABLE `subscriptions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `endpoint` VARCHAR(255) NULL,
  `auth` VARCHAR(255) NULL,
  `p256dh` VARCHAR(255) NULL,
  `last_sent_at` DATETIME DEFAULT NULL,
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
)
