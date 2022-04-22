# developer-recruitment

### Table schema

https://island-scowl-050.notion.site/3e7770dae35548db937756c6baf4503c

### Before running server

`docker run -p 5050:5432 —-name postgresdb --env POSTGRES_USER=root —-env POSTGRES_PASSWORD=mypassword postgres`

### Before testing

`docker run -p 5151:5432 —name postgrestestdb --env POSTGRES_USER=root —env POSTGRES_PASSWORD=mypassword postgres`

### Testing

`npm test <testFileLocation> "testName"`
