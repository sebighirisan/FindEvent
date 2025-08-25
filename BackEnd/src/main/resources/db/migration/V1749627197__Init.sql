CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL,
  username    VARCHAR(30) NOT NULL,
  password    TEXT NOT NULL,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL,
  created_at  TIMESTAMP WITHOUT TIME ZONE,
  updated_at  TIMESTAMP WITHOUT TIME ZONE,
  created_by  VARCHAR(100),
  updated_by  VARCHAR(100),
  version     INTEGER,
  CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles (
   id   INTEGER,
   name VARCHAR(20) NOT NULL,
   CONSTRAINT pk_roles PRIMARY KEY (id)
);

INSERT INTO roles (id, name)
VALUES
  (1, 'USER'),
  (2, 'ADMIN');

CREATE TABLE users_roles (
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  CONSTRAINT pk_users_roles PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_users_roles_users FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_users_roles_roles FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TYPE event_type_enum AS enum
  (
    -- Music
    'OUTDOOR_CONCERT',
    'LOCAL_CONCERT',
    'MUSIC_FESTIVAL',
    'SONG_CONTEST',
    'ORCHESTRA_PERFORMANCE',

    -- Sport & Fitness
    'MARATHON',
    'RACE',
    'TOURNAMENT',

    -- Performance & Visual Arts
    'THEATER_PERFORMANCE',
    'STREET_PERFORMANCE',
    'FILM_SCREENING',
    'ART_EXPO',

    -- Food & Drink Events
    'FOOD_TRUCK_FESTIVAL',
    'COOKING_COMPETITION',
    'GALA_DINNER',

    -- Educational & Professional
    'CONFERENCE',
    'NETWORKING_EVENT',
    'WORKSHOP',
    'HACKATHON',
    'TRAINING_SEMINAR',

    -- Charity
    'FUNDRAISER',
    'AUCTION',
    'VOLUNTEERING',

    -- Activism & Social Movement
    'PROTEST',
    'AWARENESS_MOVEMENT',
    'PUBLIC_GATHERING',

    -- Other
    'OTHER'
  );
CREATE CAST (CHARACTER VARYING AS event_type_enum) WITH inout AS implicit;

CREATE TABLE events (
  id           SERIAL,
  publisher_id INTEGER NOT NULL,
  name         VARCHAR(100) NOT NULL,
  description  TEXT NOT NULL,
  type         event_type_enum NOT NULL,
  start_date   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  end_date     TIMESTAMP WITHOUT TIME ZONE,
  hyperlink    TEXT,
  splash_image BYTEA,
  created_at   TIMESTAMP WITHOUT TIME ZONE,
  updated_at   TIMESTAMP WITHOUT TIME ZONE,
  created_by   VARCHAR(100),
  updated_by   VARCHAR(100),
  version      INTEGER,
  CONSTRAINT pk_events PRIMARY KEY (id),
  CONSTRAINT fk_events_publisher_id FOREIGN KEY (publisher_id) REFERENCES users (id)
);

CREATE TYPE event_status_enum AS enum
  (
    'PENDING',
    'APPROVED',
    'DECLINED'
  );
CREATE CAST (CHARACTER VARYING AS event_status_enum) WITH inout AS implicit;

CREATE TABLE event_status (
  event_id INTEGER,
  status   event_status_enum NOT NULL,
  message  VARCHAR(100),
  CONSTRAINT pk_event_requests PRIMARY KEY (event_id),
  CONSTRAINT fk_event_requests FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);

CREATE TYPE attendance_status_enum AS enum
  (
    'GOING',
    'INTERESTED'
  );
CREATE CAST (CHARACTER VARYING AS attendance_status_enum) WITH inout AS implicit;

CREATE TABLE attendances (
  user_id           INTEGER NOT NULL,
  event_id          INTEGER NOT NULL,
  attendance_status attendance_status_enum NOT NULL,
  CONSTRAINT pk_attendances PRIMARY KEY (user_id, event_id),
  CONSTRAINT fk_attendances_users FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_attendances_events FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  user_id  INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  rating   INTEGER NOT NULL,
  message  TEXT,
  CONSTRAINT pk_reviews PRIMARY KEY (user_id, event_id),
  CONSTRAINT fk_reviews_users FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_reviews_events FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  CONSTRAINT ch_reviews_rating CHECK (rating <= 5 AND rating >= 1)
);

CREATE TABLE locations (
  event_id    INTEGER,
  name        TEXT NOT NULL,
  coordinates GEOGRAPHY(POINT, 4326) NOT NULL, -- latitude/longitude (WGS 84)
  CONSTRAINT pk_locations PRIMARY KEY (event_id),
  CONSTRAINT fk_locations_events FOREIGN KEY (event_id) REFERENCES events (id)
);