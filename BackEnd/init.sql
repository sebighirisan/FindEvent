-- create roles (users)
CREATE ROLE "find-event-admin" PASSWORD 'find-event-pwd' LOGIN;

-- create schemas
ALTER SCHEMA "public" OWNER TO "find-event-admin";