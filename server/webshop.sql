/* npx sequelize-cli db:create */

USE webshop;

-- Skapa users-tabell med korrekta kolumner och datatyper
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  image_url VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

-- Skapa products-tabell med korrekta kolumner och datatyper
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

-- Lägg till användare
INSERT INTO users (username, email, first_name, last_name, image_url, created_at, updated_at)
VALUES 
  ("mikaela", "mie@du.se", "Mikaela", "Hedberg", "https://mikaela.plandigital.se/common/images/mie.jpg", '2022-11-17 22:42:14', '2022-11-17 00:00:00'),
  ("yoshi", "yoshi@du.se", "Yoshi", "Akterkvist", "https://mikaela.plandigital.se/common/images/yoshi.jpg", '2022-11-17 22:42:14', '2022-11-17 00:00:00'),
  ("princess", "leia@du.se", "Leia", "Skywalker", "https://mikaela.plandigital.se/common/images/leia.jpg", '2022-11-17 22:42:14', '2022-11-17 00:00:00');

-- Lägg till produkt
INSERT INTO products (title, description, price, image_url, created_at, updated_at)
VALUES
  ('Samsung mikrovågsugn MS23K3515AW', 'Samsung MS23K3515AW är en perfekt mikrovågsugn när du snabbt och smidigt vill tina, laga eller värma upp mat. Tack vare deodorisation och den keramiskt emaljerade interiören förhindras överföring av obehagliga lukter eller dofter på övriga livsmedel. Denna eleganta och moderna mikrovågsugn kommer i en vit färg med svart lucka. Mikrovågsugnen har en kapacitet på 23 liter och kommer med en 28,8 cm stor roterande tallrik. Välj mellan 6 effektnivåer och användbara program såsom Auto Cook, Quick Defrost eller Soften/Melt. Tack vare Quick Defrost-funktionen tinar maten snabbt och jämnt, samtidigt som den behåller en perfekt konsistens. Deodorisation-funktionen blåser ut och avlägsnar oönskade lukter inuti mikrovågsugnen. Minska energiförbrukningen med den smarta Eco Mode-funktionen. Tack vare den keramiskt emaljerade interiören är din mikrovågsugn reptålig. Den förhindrar även överföring av obehagliga lukter eller dofter på övriga livsmedel.', 1599.99, 'https://www.elgiganten.se/image/dv_web_D180001002214705/MS23K3515AW/samsung-mikrovagsugn-ms23k3515aw--pdp_zoom-3000--pdp_main-960.jp', '2022-01-01 22:42:14', '2022-01-01 22:42:14');
