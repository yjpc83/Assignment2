# README.md

IMPORTANT: Once you've cloned this to your forked repository, ensure that you continuously update this document as you complete each task to demonstrate your ongoing progress.

Please include your shared repository link here:

### Yu-Jen's shared repository

### <https://github.com/yjpc83/Assignment2.git>

Make sure for **your case it is in Private**

## Access Database

1 **Plsql Cheat Sheet:**

You can refer to the PostgreSQL cheat sheet [here](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

2 **Know the Container ID:**

To find out the container ID, execute the following command:

```bash

docker ps

9958a3a534c9 testsystem-nginx "/docker-entrypoint.…" 6 minutes ago Up 6 minutes 0.0.0.0:80->80/tcp testsystem-nginx-1

53121618baa4 testsystem-frontend "docker-entrypoint.s…" 6 minutes ago Up 6 minutes 3000/tcp testsystem-frontend-1

c89e46ac94b0 testsystem-api "docker-entrypoint.s…" 6 minutes ago Up 6 minutes 5000/tcp testsystem-api-1

9f4aea7cf538 postgres:15.3-alpine3.18 "docker-entrypoint.s…" 6 minutes ago Up 6 minutes 5432/tcp testsystem-db-1

```

3. Running the application

**docker compose command:**

```bash

docker compose up --build

```

4 **Access postgreSQL in the container:**

Once you have the container ID, you can execute the container using the following command:

You will see the example of running the PostgreSQL inside the container.

```bash

docker exec -it testsystem-db-1 psql -U postgres

choiruzain@MacMarichoy TestSystem % docker exec -it testsystem-db-1 psql -U postgres

psql (15.3)

Type "help" for help.

postgres=# \dt

List of relations

Schema | Name | Type | Owner

--------+----------+-------+----------

public | contacts | table | postgres

public | phones | table | postgres

(2 rows)

postgres=# select * from contacts;

id | name | createdAt | updatedAt

----+--------+---------------------------+---------------------------

1 | Helmut | 2024-08-08 11:57:57.88+00 | 2024-08-08 11:57:57.88+00

(1 row)

postgres=# select * from phones;

id | phone_type | number | contactId | createdAt | updatedAt

----+------------+-------------+-----------+----------------------------+----------------------------

1 | Work | 081431 | 1 | 2024-08-08 11:59:04.386+00 | 2024-08-08 11:59:04.386+00

  
  

postgres=# select * from contacts;

```

Replace `container_ID` with the actual ID of the container you want to execute.

# My documentation begins here

## Executing API

### Contact API

*Please see the folder "API Tests in Task 2". This is where all the screenshots are stored.*

1. Add contacts API (POST)

```bash
http POST http://localhost/api/contacts name="Emmanuel"
```

2 Get contacts API (GET)

```bash
http GET http://localhost/api/contacts
```

3. Show/create the API command to delete the contacts (DELETE)

```bash
http DELETE http://localhost/api/contacts/7
```

4. Show/create the API command to edit the contacts (PUT)

```bash
http PUT http://localhost/api/contacts/2 name="Peter Cheng"
```

### Phone API

1. Show Phones

```bash
http GET http://localhost/api/contacts/2/phones
```

2. Add Phone

```bash
http POST http://localhost/api/contacts/2/phones number="0342563243" name="mobile"
```

3. Update Phone

```bash
http PUT http://localhost/api/contacts/2/phones/28 number="03 3323 4323"
```

4. Delete Phone

```bash
http DELETE http://localhost/api/contacts/2/phones/28
```

### Testing API after migration

*Please see the folder "API Tests after Migration". This is where all the screenshots are stored.*

*I could not connect to the database with the original `db.config.js` file during migration. So I created a separate `migration.config.js` file to do the migration process.*

1. Create Contact

```bash
http POST http://localhost/api/contacts name="Hannah" address="12 King Street"
```

2. Show a specific Contact by `contactId`

```bash
http GET http://localhost/api/contacts/6
```

3. Show all Contacts

```bash
http GET http://localhost/api/contacts
```

4. Delete a Contact by `contactId`

```bash
http DELETE http://localhost/api/contacts/7
```

5. Show all Phones of a `contactId`

```bash
http GET http://localhost/api/contacts/2/phones
```

6. Create Phone

```bash
http POST http://localhost/api/contacts/6/phones phone_type="Home" phone_number="736352647"
```

7. Update Phone

```bash
http PUT http://localhost/api/contacts/2/phones/6 phone_type="Work" phone_number="082374622"
```

8. Delete Phone

```bash
http DELETE http:///ocalhost/api/contacts/3/phones/7
```

### Documenting Process for Front End - Task 5

**Thought process for design**

- The database structure allows a contact to have multiple companies, but I've decided that it complicates the UI and UX to allow a contact to have multiple companies because most of the time we don't need to know all the companies a contact is in. I'm going to design UI to only let users to create one company per contact.

- The company information is going to be displayed in a card called `CompanyCard`. This has to be a react component. This information is best to reside with the contact information. I'll put the Company Card right under the phone list.

- Since we need to include the edit capability, which is different from all other components in this task, I think I'm going to use just 2 buttons to manage save and delete, to simplify the UI and the UX. If an edit has happened, the component should check if the entry already exists. If it does not exist, then it creates a new company, else it updates the existing company. In this way, I only need a save button and a delete button.

- The company card component should have 2 labels and 2 text fields (for company name and company address) and 2 buttons (save and delete).

- I created the react component first by creating the return element, with no functionality. Added some css into `App.css` to make it look better. Committed the change.

- I had to decide which properties are needed to pass to the `CompanyCard`. At first I loaded company data in the Contact component, in the same useEffect block as loading the information. Then I decided that I better put that with the `CompanyCard` so that all the company related code is in one place.

- The initial loading company information then sets the state of the component. This was fine until I realised that I need to use 2 more state variables to track changes of the text inputs. Then a series of errors happened and I had to study async/await as well as useState/useEffect again, as most of the errors arise from not getting the updated values I expect.

- The other problems happened due to lack of understanding of values and arrays in javascript, where code looked right, but only differed by {} and []. Treatments to the differences caused me a lot of frustration.

- The last main problem I encountered was disabling/enabling of buttons based on current state. It was confusing like the problems of tracking what is the current value and the new value, and how these values update as soon as I updates the database or delete from it.

- I lastly removed all the `console.logs` that I used for debugging and cleaned up some highlights my linter flagged me.
