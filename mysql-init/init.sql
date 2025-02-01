-- mysql-init/init.sql
CREATE DATABASE IF NOT EXISTS greenlight_app;
CREATE DATABASE IF NOT EXISTS greenlight_app_shadow;

-- Grant all privileges to admin user
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON greenlight_app.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON greenlight_app_shadow.* TO 'admin'@'%';
FLUSH PRIVILEGES;
