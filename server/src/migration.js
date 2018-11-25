import connection from './connection'

connection.connect()
const query = 'CREATE TABLE `subscriptions` (`id` INT NOT NULL AUTO_INCREMENT, `endpoint` VARCHAR(255) NULL, `auth` VARCHAR(255) NULL, `p256dh` VARCHAR(255) NULL, PRIMARY KEY (`id`))'
connection.query(query, (_error, results) => console.log(results))
connection.end()
