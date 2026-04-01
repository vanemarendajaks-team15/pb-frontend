# Running PB-backend and PB-frontend repositories in local system

## PB-Backend
1. git clone https://github.com/vanemarendajaks-team15/pb-backend.git
2. go to repository folder
    * cd pb-backend
3. create environment file 
    * copy and paste .env.example file and rename it to .env
4. run commands in terminal
    * php artisan key:generate <- generates application key in .env file
    * php artisan migrate <- migrates user etc tables into sqlite
    * php artisan serve <- runs artisan server on port 8000
### Backend should run on port 8000
* you should see laravel version text in your browser @ http://127.0.0.1:8000/

## PB-Frontend
1. git clone https://github.com/vanemarendajaks-team15/pb-frontend.git
2. go to repository folder
   * cd pb-frontend
3. create environment file
   * copy and paste .env.example file and rename it to .env
4. run commands in terminal
   * npm i <- installs npm
   * composer i <- installs composer
   * npm run dev <i runs vite.js server
5. open another terminal and run command
   * php artisan key:generate <- generates app key
   * php artisan migrate <- migrates database
   * pht artisan serve <- runs artisan server on port 8001 <- back runs already on port 8000
### Frontend should run on port 8000
 * You should see laravel 13 welcome page in your browser @ http://127.0.0.1:8001/
