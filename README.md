# Nx Fullstack App (Angular + NestJS + MongoDB + NgRx)

This is a fullstack monorepo web application built using:

- ⚙️ Angular for frontend
- 🚀 NestJS for backend API
- 🧠 NgRx for state management
- 🛢️ MongoDB Atlas for database
- 📦 EmailJS for password reset
- 🗂️ Nx.dev for monorepo management

---

## 📁 Project Structure

```
apps/
  ├── frontend       # Angular App
  └── backend        # NestJS API
libs/                # Shared libraries (optional)
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/afham-haleema/penny-software.git

```

### 2. Install Dependencies

```bash
npm install
```

> Requires Node.js 18+ and Nx CLI (`npm install -g nx`)

### 3. Setup Environment Variables

Create a `.env` file in the root or `apps/backend/`:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret
EMAILJS_USER_ID=your_emailjs_user_id
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

---

## 🧪 Development

### Start Frontend (Angular)

```bash
nx serve frontend
```

Runs at: `http://localhost:4200`

### Start Backend (NestJS)

```bash
nx serve backend
```

Runs at: `http://localhost:3000`

---

## 🧠 State Management

NgRx is used for managing frontend state.

- Store and Effects setup for authentication and data
- Auth state is persisted and shared across components

---

## 🔐 Authentication Flow

- JWT-based authentication
- Signup, Sign In, Sign Out with session timeout (8 hrs)
- Auth Guard protects private routes
- Forgot Password: EmailJS sends reset link to user

---

## 📫 Forgot Password Flow

1. User clicks “Forgot Password?” in login screen
2. Enters email → EmailJS sends password reset email
3. Email link navigates to `/reset-password` with token
4. User sets a new password → backend verifies and updates

---

## 🛠️ Technologies Used

| Area       | Tech                          |
|------------|-------------------------------|
| Frontend   | Angular, Tailwind CSS         |
| Backend    | NestJS, JWT, EmailJS, MongoDB |
| State Mgmt | NgRx (Store, Effects)         |   
| DevTools   | Nx, GitHub                    |

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Afham Haleema**  
[GitHub](https://github.com/afham-haleema) • [LinkedIn](https://linkedin.com/in/afhamhaleema)
