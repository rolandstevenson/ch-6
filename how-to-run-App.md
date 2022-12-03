## Getting Started

I. Make database on Postgre or mysql etc

-- Database Config --
migration dan seeder untuk membuat Database tabel dan isinya.

1. Go to config database.js change name database etc.
2. Cara migrasi: npm run db:migrate
3. Cara seeding: npm run db:seed

II. Type on terminal "npm run start"

## Endpoints

In this repository have 2 category Endpoints : authentication dan CRUD Car.

- Register user = http://localhost:3001/api/v1/register method POST
- Register admin = http://localhost:3001/api/v1/registeradmin method POST (access only superadmin)
- Login = http://localhost:3001/api/v1/login method POST
- Logout = http://localhost:3001/api/v1/logout method DELETE
- Get all users = http://localhost:3001/api/v1/users method GET (access only superadmin)
- Who Am I = http://localhost:3001/api/v1/whoami method GET

- Get All Cars = http://localhost:3001/api/v1/cars method GET (access only admin or superadmin)
- Get One Car = http://localhost:3001/api/v1/car/:id method GET (access only admin or superadmin)
- Get availability car = http://localhost:3001/api/v1/car/available/1 method GET
- Create car = http://localhost:3001/api/v1/car/add method POST (access only admin or superadmin)
- Edit car = http://localhost:3001/api/v1/car/edit/:id method PUT (access only admin or superadmin)
- Delete car = http://localhost:3001/api/v1/car/delete/:id method DELETE (access only admin or superadmin)

# Documentation REST on Postman and Swagger
On Progress
