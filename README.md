<!-- # Project Name: API-Based Web Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Local Development Setup](#local-development-setup)
- [External API Configuration](#external-api-configuration)
- [Handling File Uploads and Static Files](#handling-file-uploads-and-static-files)
- [API Usage Examples](#api-usage-examples)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Introduction
This project is a web application built using modern web development technologies. It leverages external APIs to provide dynamic functionality and supports file uploads and static file management.

## Features
- Integration with external APIs for data retrieval and processing.
- File upload functionality with secure storage.
- RESTful API endpoints for seamless client-server communication.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the environment variables (see [Environment Variables](#environment-variables)).

---

## Local Development Setup
1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Make sure all required APIs and services are running and accessible.

---

## External API Configuration

### APIs Used
- **Example API 1**: OpenWeatherMap API for weather data.
- **Example API 2**: Unsplash API for fetching images.

### Setup
1. Obtain API keys:
    - [OpenWeatherMap API](https://openweathermap.org/api)
    - [Unsplash API](https://unsplash.com/developers)

2. Add the API keys to the `.env` file:
    ```env
    OPENWEATHER_API_KEY=your_openweather_api_key
    UNSPLASH_API_KEY=your_unsplash_api_key
    ```

3. Use the keys in your application by importing them:
    ```javascript
    const weatherApiKey = process.env.OPENWEATHER_API_KEY;
    const unsplashApiKey = process.env.UNSPLASH_API_KEY;
    ```

---

## Handling File Uploads and Static Files

### File Uploads
- File uploads are handled using [Multer](https://github.com/expressjs/multer) middleware.
- Uploaded files are stored in the `uploads/` directory.

### Static Files
- Static files (e.g., images, CSS, JS) are served from the `public/` directory.

---

## API Usage Examples

### Endpoints
1. **GET /api/weather**
    - **Description**: Fetch weather data for a given city.
    - **Request**:
      ```json
      {
         "city": "New York"
      }
      ```
    - **Response**:
      ```json
      {
         "temperature": "15°C",
         "description": "Clear sky"
      }
      ```

2. **POST /api/upload**
    - **Description**: Upload a file.
    - **Request**:
      - Form-data with a file field named `file`.
    - **Response**:
      ```json
      {
         "message": "File uploaded successfully",
         "filePath": "/uploads/filename.jpg"
      }
      ```

---

## Environment Variables
The application uses the following environment variables:

| Variable Name         | Description                          |
|-----------------------|--------------------------------------|
| `OPENWEATHER_API_KEY` | API key for OpenWeatherMap API       |
| `UNSPLASH_API_KEY`    | API key for Unsplash API             |
| `BASE_URL`            | Base URL for the application         |

Create a `.env` file in the root directory and add the variables:
```env
OPENWEATHER_API_KEY=your_openweather_api_key
UNSPLASH_API_KEY=your_unsplash_api_key
BASE_URL=http://localhost:3000
```

---

## License
This project is licensed under the [MIT License](LICENSE). -->

# Crypto and Weather Tracker Application

This is a web-based application that provides real-time cryptocurrency tracking, weather updates, and the latest cryptocurrency news. The application is built using **Next.js** and integrates multiple APIs for fetching live data.

---

## Features

- **Cryptocurrency Tracker**: Real-time price updates for Bitcoin (BTC) and Ethereum (ETH) using WebSocket.
- **Weather Updates**: Fetches current weather data for any city using the OpenWeatherMap API.
- **Crypto News**: Displays the latest cryptocurrency news using the RapidAPI Crypto News API.
- **Simulated Weather Alerts**: Periodic weather alerts using toast notifications.

---

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
- **npm**: Comes with Node.js, used for installing dependencies.

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/crypto-weather-tracker.git
   cd crypto-weather-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and configure the following environment variables:
   ```env
   NEXT_PUBLIC_API_KEY=your_openweathermap_api_key
   NEXT_PUBLIC_X_RAPID_API_KEY=your_rapidapi_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## External APIs

### 1. **OpenWeatherMap API**
   - **Usage**: Fetches weather data for a given city.
   - **Setup**: 
     - Sign up at [OpenWeatherMap](https://openweathermap.org/).
     - Generate an API key and add it to the `.env.local` file as `NEXT_PUBLIC_API_KEY`.
   - **Example API Call**:
     ```bash
     GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}
     ```
     - **Response**:
       ```json
       {
         "main": {
           "temp": 298.15,
           "humidity": 78
         },
         "wind": {
           "speed": 3.09
         },
         "name": "London",
         "weather": [
           {
             "icon": "01d"
           }
         ]
       }
       ```

### 2. **CoinCap API**
   - **Usage**: Fetches cryptocurrency data and real-time price updates.
   - **Endpoints**:
     - **Top Cryptocurrencies**:
       ```bash
       GET https://api.coincap.io/v2/assets
       ```
     - **Specific Cryptocurrency**:
       ```bash
       GET https://api.coincap.io/v2/assets/{crypto_name}
       ```
     - **WebSocket for Real-Time Prices**:
       ```bash
       wss://ws.coincap.io/prices?assets=bitcoin,ethereum
       ```

### 3. **RapidAPI Crypto News API**
   - **Usage**: Fetches the latest cryptocurrency news.
   - **Setup**:
     - Sign up at [RapidAPI](https://rapidapi.com/).
     - Subscribe to the Crypto News API and generate an API key.
     - Add the key to the `.env.local` file as `NEXT_PUBLIC_X_RAPID_API_KEY`.
   - **Example API Call**:
     ```bash
     GET https://crypto-news16.p.rapidapi.com/news/top/5
     ```
     - **Response**:
       ```json
       [
         {
           "title": "Bitcoin hits new high",
           "description": "Bitcoin reaches $60,000 for the first time.",
           "url": "https://example.com/news/bitcoin",
           "thumbnail": "https://example.com/image.jpg",
           "date": "2023-10-01T12:00:00Z"
         }
       ]
       ```

---

## Handling Static Files

- **Weather Icons**: Stored in the `assets` folder under `@/assets/`.
- **Crypto News Thumbnails**: Dynamically fetched from the API and displayed in the UI.

---

## API Call Examples

### Fetch Weather Data
```javascript
const fetchWeather = async (city) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
};
```

### Fetch Cryptocurrency Data
```javascript
const fetchCrypto = async (cryptoName) => {
  const response = await fetch(`https://api.coincap.io/v2/assets/${cryptoName}`);
  const data = await response.json();
  console.log(data);
};
```

### Fetch Crypto News
```javascript
const fetchNews = async () => {
  const apiKey = process.env.NEXT_PUBLIC_X_RAPID_API_KEY;
  const response = await fetch("https://crypto-news16.p.rapidapi.com/news/top/5", {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "crypto-news16.p.rapidapi.com",
    },
  });
  const data = await response.json();
  console.log(data);
};
```

---

## Environment Variables

| Variable Name               | Description                                |
|-----------------------------|--------------------------------------------|
| `NEXT_PUBLIC_API_KEY`       | API key for OpenWeatherMap.               |
| `NEXT_PUBLIC_X_RAPID_API_KEY` | API key for RapidAPI Crypto News.         |

---

## Development Guidelines

1. **File Uploads**: Currently, the application does not handle file uploads.
2. **Static Files**: Ensure all static assets (e.g., weather icons) are stored in the `assets` folder.
3. **Error Handling**: All API calls include error handling to manage failed requests gracefully.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/)
- [CoinCap API](https://coincap.io/)
- [RapidAPI Crypto News](https://rapidapi.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)