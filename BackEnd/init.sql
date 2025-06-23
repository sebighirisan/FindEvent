-- create roles (users)
CREATE ROLE "find-event-admin" PASSWORD 'find-event-pwd' LOGIN;

-- create schemas
ALTER SCHEMA "public" OWNER TO "find-event-admin";

-- create extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;