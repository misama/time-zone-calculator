# time-zone-calculator
time-zone-calculator
## Getting Started
1. node Version
    10+
2. Clone the repo
   ```sh
   git clone https://github.com/misama/time-zone-calculator.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Prepare your own API_KEY from https://timezonedb.com/
## Run Front-End only
**Using this way will call the api from browser directly. 
   ```sh
   npm run dev:fe
   ```
   visit http://localhost:5000 from browser
## Run Server-Side only
   ```sh
   npm run dev
   ```
   visit http://localhost:8080/get-time-zone?lat=1&lng=1&key=YOUR_OWN_KEY from browser
## Run Application both Front-End and Server-Side: 
**Using this way the Front-End to Server-Side, and thee API will call from Server-Side
   ```sh
   npm run build
   npm run start
   ```
   visit http://localhost:8080 from browser
