# Coding Challenge

## Prerequisites

- **Node.js** (v18 or later)
- **Docker & Docker Compose** (for running the database)

## Installation

1. **Clone the repository**  
   ```sh
   git clone git@github.com:franjo-pozaic/coding-challenge-2025-02.git
   cd coding-challenge-2025-02
   ```

2. **Start the database**  
   ```sh
   docker compose up -d
   ```

3. **Install dependencies**  
   ```sh
   npm --prefix ./client install
   npm --prefix ./server install
   ```

4. **Run the application**  
   - **Start the client:**  
     ```sh
     npm --prefix ./client run dev
     ```
   - **Start the server:**  
     ```sh
     npm --prefix ./server run start
     ```

5. **Open the app in your browser**  
   ```
   http://localhost:5173
   ```


