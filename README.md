# ⚡ EV-Charge

> A modern, full-stack Electric Vehicle (EV) Charging Station Finder and Booking Platform.

![Banner](assets/Screenshot%202025-12-28%20153216.png)

## 📖 Overview

**EV-Charge** is a comprehensive web application designed to help EV owners find nearby charging stations, plan trips with optimal charging stops, and book charging slots in advance. It features a robust Admin Dashboard for managing stations, users, and bookings, ensuring a seamless experience for both administrators and end-users.

## ✨ Key Features

### 🚗 User Features
-   **interactive Map:** Find charging stations visually with clustering and detailed info windows.
-   **Smart Route Planning:** Input start and destination to get a route with recommended charging stops based on your vehicle's range.
-   **Booking System:** Reserve charging slots at specific stations for a set duration.
-   **Vehicle Profile:** Manage your EV details (Model, Battery Capacity, Range) for personalized recommendations.
-   **Payment Simulation:** Integrated mock payment gateway for secure booking flow.

### 🛡️ Admin Features
-   **Dashboard Overview:** Real-time analytics on Users, Active Stations, Bookings, and Revenue.
-   **Analytics:** Visual charts (Area & Bar charts) for booking trends and revenue analysis.
-   **Station Management:** Add, Edit, Delete, and Locate charging stations.
-   **User Management:** View user list, roles, and block/unblock users.
-   **Booking & Transaction History:** comprehensive logs of all bookings and financial transactions.

## 🛠️ Tech Stack

-   **Frontend:** React.js, Vite, Tailwind CSS, Lucide React (Icons), Recharts (Analytics), Leaflet (Maps)
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Authentication:** JWT (JSON Web Tokens)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16 or higher)
-   MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/SharvChopra/EV-Charge.git
    cd EV-Charge
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    -   Create a `.env` file in the `backend` folder:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        PORT=5000
        ```
    -   Start the Backend:
        ```bash
        npm run server
        ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    # If you encounter issues, try: npm install --force
    ```
    -   Start the Frontend:
        ```bash
        npm run dev
        ```

4.  **Access the App**
    -   Frontend: `http://localhost:5173`
    -   Backend API: `http://localhost:5000`

## 📸 Screenshots

| Dashboard | Route Planning |
| :---: | :---: |
| ![Dashboard](assets/Screenshot%202025-12-28%20153751.png) | ![Route Plan](assets/Screenshot%202025-12-28%20153444.png) |

| Admin Analytics | Station Management |
| :---: | :---: |
| ![Analytics](assets/Screenshot%202025-12-28%20153323.png) | ![Stations](assets/Screenshot%202025-12-28%20153235.png) |

| Booking Flow | Transaction History |
| :---: | :---: |
| ![Booking](assets/Screenshot%202025-12-28%20153542.png) | ![Transactions](assets/Screenshot%202025-12-28%20153309.png) |

<details>
<summary>View More Screenshots</summary>

![Shot 1](assets/Screenshot%202025-12-28%20153258.png)
![Shot 2](assets/Screenshot%202025-12-28%20153336.png)
![Shot 3](assets/Screenshot%202025-12-28%20153346.png)
![Shot 4](assets/Screenshot%202025-12-28%20153358.png)
![Shot 5](assets/Screenshot%202025-12-28%20153412.png)
![Shot 6](assets/Screenshot%202025-12-28%20153427.png)
![Shot 7](assets/Screenshot%202025-12-28%20153500.png)
![Shot 8](assets/Screenshot%202025-12-28%20153513.png)
![Shot 9](assets/Screenshot%202025-12-28%20153529.png)
![Shot 10](assets/Screenshot%202025-12-28%20153553.png)
![Shot 11](assets/Screenshot%202025-12-28%20153710.png)
![Shot 12](assets/Screenshot%202025-12-28%20153731.png)
![Shot 13](assets/Screenshot%202025-12-28%20153740.png)

</details>

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

---

Made with ❤️ by [Sharv Chopra]
