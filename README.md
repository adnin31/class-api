# Class Management API

## Overview
This is an Express.js-based API for managing a class system where:
- Teachers can register multiple students.
- Students can be registered to multiple teachers.
- Teachers can retrieve a list of students common to them.
- Teachers can suspend students.
- Teachers can send notifications to students who are registered or mentioned.

The project is built with:
- **Node.js** (Express.js for API development)
- **MySQL** (with Sequelize ORM)
- **Docker** (for containerization)
- **Jest** (for unit testing)

---

## **Setup Instructions**

### **1️⃣ Clone the Repository**
```sh
  git clone <this repo>
  cd class-api
```

### **2️⃣ Install Docker in your OS**
- Visit [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
- Visit [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/).

- Or Visit my [Installation Guide](install-docker-guide.md)


### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and configure it as follows:
```env
DATABASE_URL=mysql://user:password123@db:3306/school
```

### **4️⃣ Start the Application with Docker**
```sh
  npm start
```

### **5️⃣ Stop the Application with Docker**
```sh
  npm stop
```

This will:
- Start a **MySQL** database.
- Start the **Express.js** API.
- Expose API endpoints on `http://localhost:3000`.

### **6️⃣ Connect Database in DBeaver**
- **Host:** `localhost`
- **Port:** `3306`
- **Database:** `school`
- **User:** `user`
- **Password:** `password123`
- **Enable Public Key Retrieval** if needed.

### **7️⃣ Run Migrations**
```sh
  npx sequelize-cli db:migrate
```

This creates the necessary tables in MySQL.

### **8️⃣ Run Tests**
```sh
  npm test
```

---

## **Database Schema**

### **Users Table**
Stores user details including both teachers and students.

| Column   | Type         | Attributes        |
|----------|------------|------------------|
| id       | UUID       | Primary Key       |
| email    | STRING     | Unique, Not Null |
| name     | STRING     | Not Null         |
| role     | ENUM       | ('teacher', 'student') |
| createdAt | TIMESTAMP  | Auto-generated   |
| updatedAt | TIMESTAMP  | Auto-generated   |

### **TeacherStudent Table**
Stores the relationship between teachers and students (many-to-many).

| Column      | Type  | Attributes                      |
|------------|------|--------------------------------|
| teacherId  | UUID | Foreign Key (references Users.id) |
| studentId  | UUID | Foreign Key (references Users.id) |
| createdAt  | TIMESTAMP | Auto-generated |
| updatedAt  | TIMESTAMP | Auto-generated |

---

## **API Endpoints**

### **1️⃣ Register Teachers & Students**
**Endpoint:** `POST /api/register`
```json
{
  "teacher": "teacherken@gmail.com",
  "students": [
    "studentjon@gmail.com",
    "studenthon@gmail.com"
  ]
}
```
**Response:** **Response:**
```json
{
	"message": "Teacher & students registered successfully"
}
```

### **2️⃣ Get Common Students**
**Endpoint:** `GET /api/commonstudents?teacher=teacherken@gmail.com`
```json
{
  "students": ["studentbob@gmail.com"]
}
```

### **3️⃣ Suspend a Student**
**Endpoint:** `POST /api/suspend`
```json
{
  "student": "studentmary@gmail.com"
}
```
**Response:** ```json
{
	"message": "Student studentjon@gmail.com has been suspended"
}
```

### **4️⃣ Retrieve Students for Notification**
**Endpoint:** `POST /api/retrievefornotifications`
```json
{
  "teacher": "teacherken@gmail.com",
  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
}
```
**Response:**
```json
{
  "recipients": ["studentbob@gmail.com", "studentagnes@gmail.com", "studentmiche@gmail.com"]
}
```
