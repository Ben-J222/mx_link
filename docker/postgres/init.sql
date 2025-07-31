-- docker/postgres/init.sql
-- Initialisation base MX Link

-- Extensions utiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Database de test
CREATE DATABASE mxlink_test OWNER mxlink;

-- Logs
SELECT 'MX Link database initialized' as status;