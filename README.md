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
