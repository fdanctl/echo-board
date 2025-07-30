## Usage

### Step 1: Clone the repository

Clone the repository using Git and enter project folder:

```bash
git clone https://github.com/your-username/project-name.git
cd echo-box/
```

### Step 2: Create a `.env` file

Copy the contents of `.env.example` to a new file named `.env`. This file contains environment variables that are used throughout the project.

```bash
cp .env.example .env
```

### Step 3: Install dependencies

Install the dependencies using npm:

```bash
cd client/ && npm install
cd ../server/ && npm install && cd ../
```

### Step 4: Build and start the server

Build the Docker image for the server and start it:

```bash
docker compose build
docker compose up -d
```

This will build the image, create a container, and start the server in detached mode.

### Step 5: Migrate Prisma schema

Run the following command to migrate the Prisma schema:

```bash
docker compose exec server npx prisma migrate dev --name init
```

This will apply the initial migration and some initial data to the PostgreSQL database.

### Step 6: Open in the browser

Go to `http://localhost:3000`
If it shows an error stop all containers and restart.

```bash
docker compose down
docker compose up -d
```

## Usefull command

### create a secret value

run node

```sh
node
```

then use the crypto library

```sh
> require("crypto").randomBytes(64).toString("hex")
'2cf755f8e671f1db93c33b14d0b944c757c0d4bdb0e1016297db0f20aa805c6e52dbe1410423307136f125d3ec0900a4385c6e5f61fe7ba989cc06ed0c91ffa9'
```

### create and apply prisma migration

```sh
docker compose exec server npx prisma migrate dev --name init
```

### access postgres via cli

```sh
docker exec -it echoboardDB psql -U <POSTGRES_USER> -d <your_db_name>
```

### Seed data

```sh
docker exec -it server npx prisma db seed
```
