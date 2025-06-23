FROM postgis/postgis:15-3.5

# Install build tools and PostgreSQL dev headers
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    postgresql-server-dev-15 \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
    && git clone https://github.com/pgvector/pgvector.git /pgvector # Clone pgvector source code

# Set working directory
WORKDIR /pgvector

# Build and install pgvector
RUN make && make install

# Cleanup
WORKDIR /
RUN rm -rf /pgvector && apt-get remove -y \
    build-essential \
    git \
    postgresql-server-dev-15 \
    && apt-get autoremove -y && apt-get clean