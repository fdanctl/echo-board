create a secret value
run node

```sh
node
```

then use the crypto library

```sh
> require("crypto").randomBytes(64).toString("hex")
'2cf755f8e671f1db93c33b14d0b944c757c0d4bdb0e1016297db0f20aa805c6e52dbe1410423307136f125d3ec0900a4385c6e5f61fe7ba989cc06ed0c91ffa9'
```

create and apply prisma migration
```sh
docker compose exec server npx prisma migrate dev --name init
```

access postgres via cli
```sh
docker exec -it echoboardDB psql -U <POSTGRES_USER> -d <your_db_name>
```

### Add genre, tags and mood

```sh
docker exec -it server npx prisma db seed
```

