CREATE TABLE IF NOT EXISTS users (
    id          SERIAL,
    username    VARCHAR(30) NOT NULL,
    password    TEXT NOT NULL,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
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
  (2, 'CREATOR'),
  (3, 'ADMIN'),
  (4, 'SUPERUSER');

CREATE TABLE users_roles (
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  CONSTRAINT pk_users_roles PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_users_roles_users FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_users_roles_roles FOREIGN KEY (role_id) REFERENCES roles (id)
);