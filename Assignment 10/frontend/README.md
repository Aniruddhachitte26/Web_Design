
# Admin & Employee Portal with Redux

## Project Overview

This project is a full-stack web application that provides separate portals for administrators and employees of an organization. The application uses Redux for state management and implements role-based access control to ensure users can only access authorized pages. Administrators can manage users and job postings, while employees can browse available job opportunities.

## Technologies Used

### Frontend
- React.js
- Redux and Redux Toolkit for state management
- React Router for navigation
- Material UI for components and styling
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Bcrypt.js for password hashing
- Multer for file uploads
- CORS for cross-origin requests

## Features

### Authentication
- Secure login with email and password
- Role-based access control (Admin/Employee)
- Protected routes requiring authentication

### Admin Portal
- Dashboard displaying employee information
- Add new job listings
- View all registered users

### Employee Portal
- Browse available job listings
- View company showcase
- Contact page

## Project Structure

```
project-root/
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AddJob.jsx
│   │   │   │   └── EmployeesList.jsx
│   │   │   ├── employee/
│   │   │   │   └── Jobs.jsx
│   │   │   ├── About.jsx
│   │   │   ├── CompanyShowcase.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── JobListings.jsx
│   │   │   ├── Login.jsx
│   │   │   └── NavBar.jsx
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   │   ├── authActions.js
│   │   │   │   ├── jobActions.js
│   │   │   │   └── userActions.js
│   │   │   ├── reducers/
│   │   │   │   ├── authReducer.js
│   │   │   │   ├── index.js
│   │   │   │   ├── jobReducer.js
│   │   │   │   └── userReducer.js
│   │   │   ├── store.js
│   │   │   └── types.js
│   │   ├── routes/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── AppRoutes.jsx
│   │   │   └── EmployeeRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── jobController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   ├── upload.js
│   │   │   └── validation.js
│   │   ├── models/
│   │   │   ├── jobModel.js
│   │   │   └── userModel.js
│   │   └── routes/
│   │       ├── jobRoutes.js
│   │       └── userRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── swagger.yaml
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create an `images` directory in the root of the backend folder:
   ```
   mkdir images
   ```

4. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:3000

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:5173

## API Endpoints

### Authentication
- `POST /login` - Authenticate a user
  
### User Management
- `POST /` - Create a new user
- `PUT /edit` - Update user details
- `DELETE /delete` - Delete a user
- `GET /getUser` - Get all users
- `POST /uploadImage` - Upload a user profile image

### Job Management
- `POST /jobs/create` - Create a new job listing
- `GET /jobs` - Get all job listings (with pagination)
- `GET /jobs/:id` - Get a specific job by ID
- `PUT /jobs/:id` - Update a job listing
- `DELETE /jobs/:id` - Delete a job listing

## Role-Based Access Control

### Admin Routes
- `/admin/employees` - View all employees
- `/add-job` - Add new job listings
- `/admin/home` - Admin dashboard
- `/admin/about` - About page for admins

### Employee Routes
- `/jobs` - View all job listings
- `/company-showcase` - View company profiles
- `/contact` - Contact page
- `/employee/home` - Employee dashboard
- `/employee/about` - About page for employees

## Testing Accounts

For testing the application, you can use these sample credentials:

### Admin Account
- Email: admin@example.com
- Password: Admin@123

### Employee Account
- Email: employee@example.com
- Password: Employee@123

## State Management with Redux

The application uses Redux for state management with the following stores:

- **Auth Store**: Manages authentication state including user information, login status, and errors
- **Job Store**: Manages job listings including creation, fetching, and pagination
- **User Store**: Manages user data including fetching users and related operations

## Screenshots

(Screenshots would be included here)

## Future Improvements

- Add advanced filtering options for job listings
- Implement a notification system
- Add job application functionality
- Enhance mobile responsiveness
- Add unit and integration tests

## Contributors

- Your Name

## License

This project is for educational purposes as part of the Web Design Assignment 10.