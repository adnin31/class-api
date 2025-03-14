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
  git clone <repository-url>
  cd class-api
```

### **2️⃣ Install Dependencies**
```sh
  npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and configure it as follows:
```env
DATABASE_URL=mysql://root:password@db:3306/classdb
```

### **4️⃣ Start the Application with Docker**
```sh
  npm start
```

### **4️⃣ Stop the Application with Docker**
```sh
  npm stop
```

This will:
- Start a **MySQL** database.
- Start the **Express.js** API.
- Expose API endpoints on `http://localhost:3000`.

### **5️⃣ Connect Database in DBeaver**
- **Host:** `localhost`
- **Port:** `3306`
- **Database:** `school`
- **User:** `user`
- **Password:** `password123`
- **Enable Public Key Retrieval** if needed.

### **6️⃣ Run Migrations**
```sh
  npx sequelize-cli db:migrate
```

This creates the necessary tables in MySQL.

### **7️⃣ Run Tests**
```sh
  npm test
```

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
**Response:** `HTTP 204 No Content`

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
**Response:** `HTTP 204 No Content`

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

---

## **Project Structure**
```
class-api/
│── src/
│   ├── controllers/
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── TeacherStudent.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── teacherRoutes.js
│   ├── config/
│   │   ├── database.js
│── migrations/
│── tests/
│── docker-compose.yml
│── package.json
│── README.md
```

---

## **Test Scenarios**

### **1️⃣ Register Teachers & Students**
- **Test:** Register a teacher with multiple students.
- **Expected Result:** The students are associated with the teacher, and the API returns HTTP 204.

### **2️⃣ Get Common Students**
- **Test:** Retrieve students common to one or more teachers.
- **Expected Result:** Returns a list of students who are registered to ALL given teachers.

### **3️⃣ Suspend a Student**
- **Test:** Suspend a student and check if they appear in notifications.
- **Expected Result:** The student is marked as suspended and does not receive notifications.

### **4️⃣ Retrieve Students for Notification**
- **Test:** Send a notification and check recipients.
- **Expected Result:** Only registered or mentioned students receive notifications, avoiding duplicates.

---

## **Next Steps & Enhancements**
- Implement **pagination** for large student lists.
- Add **role-based access control**.
- Improve **error handling** with better responses.

🚀 **Now your API is ready to use!** Happy coding! 🎉

