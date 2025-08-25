-- create schemas
ALTER SCHEMA "public" OWNER TO "postgres";

-- create extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;