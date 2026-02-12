# 🌱 AgriTrust Lanka – Web

AgriTrust Lanka is a modern digital platform designed to improve transparency, trust, and efficiency in the Sri Lankan agricultural ecosystem. This frontend application is built using **Next.js** and provides a user-friendly interface for farmers, buyers, and administrators to interact with the AgriTrust platform.

---

## 🚀 Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **Icons:** React Icons
* **Utility Library:** clsx

---

## 📁 Project Structure

```
src
 ┣ app              # Next.js pages and routing
 ┣ components       # Reusable UI components
 ┣ services         # API communication logic
 ┣ routes           # Route constants
 ┣ utils            # Helper functions
 ┣ assets           # Images, logos, and static files
 ┗ styles           # Custom styles
```

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```
git clone <repository-url>
cd agritrust-frontend
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory.

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

### 4️⃣ Run Development Server

```
npm run dev
```

Application will run on:

```
http://localhost:3000
```

---

## 🌐 Features

* User Authentication (Login / Registration)
* Farmer Dashboard
* Buyer Dashboard
* Document Verification
* Product Listings
* Admin Management Panel
* Secure API Integration
* Responsive UI Design

---

## 🔗 API Integration

Axios instance is configured inside:

```
src/services/api.js
```

It automatically connects to the backend using environment variables.

---

## 🧭 Routing

Route constants are managed inside:

```
src/routes/index.js
```

This helps maintain consistent and scalable routing across the application.

---

## 🎨 Styling

This project uses **Tailwind CSS** for styling.
Custom theme colors can be modified inside:

```
tailwind.config.js
```

---

## 🧩 Reusable Components

Reusable UI components such as navigation bars, buttons, and layouts are stored in:

```
src/components
```

---

## 📦 Essential Dependencies

| Package     | Purpose               |
| ----------- | --------------------- |
| axios       | Backend communication |
| react-icons | UI icons              |
| clsx        | Conditional styling   |

---

## 📌 Best Practices Followed

* Separation of UI and business logic
* Reusable component architecture
* Environment-based configuration
* Modular folder structure
* Scalable routing management

---

## 🔮 Future Improvements

* Role-based access control
* State management integration (Zustand / Redux)
* Form validation using Yup or Zod
* Performance optimization
* Real-time notifications
* Progressive Web App (PWA) support

---

## 🤝 Contribution

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Submit a Pull Request

---

## 📄 License

This project is developed for educational and development purposes. Licensing can be updated based on production deployment requirements.

---

## 👨‍💻 Developed For

**AgriTrust Lanka**
Digital platform promoting trusted agricultural trade and transparency across Sri Lanka.

---
