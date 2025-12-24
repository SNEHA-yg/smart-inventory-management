# Integration Guide  
## Smart Inventory Management System

This document explains how the **Frontend (React)** and **Backend (Node.js + Express)** are integrated in the Smart Inventory Management System.

---

## 1. System Architecture

The project follows a **client–server architecture**:

- **Frontend**: React + Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (Atlas)  
- **Authentication**: JWT (JSON Web Token)  
- **Notifications**: Database-based (Dashboard alerts)

---

## 2. Frontend–Backend Communication

Frontend communicates with the backend using **REST APIs** via Axios.

### API Base Configuration (`frontend/src/services/api.js`)

```js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
