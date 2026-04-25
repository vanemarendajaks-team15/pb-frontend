# Running PB-backend and PB-frontend repositories in local system

## Laravel 13 min requirements:
 * php <- php -v >= 8.3
 * composer <- composer --version >= 2.7
 * node.js <- node -v >= 18.x
 * PostgresSQL 13+

## PHP extensions
 * openssl
 * pdo
 * mbstring
 * tokenizer
 * xml
 * ctype
 * json
 * bcmath
 * fileinfo

## macOS installation
1. Install Homebrew
    * /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. Install PHP 8.3 (or newer, change php version)
   * brew install php@8.3
   * brew link php@8.3 --force
   * php -v
3. Install Composer
   * brew install composer
   * composer --version
4. Install Node.js (LTS)
   * brew install node
   * node -v
   * npm -v

## Ubuntu 24.04 install
1. Update system
   * sudo apt update && sudo apt upgrade -y
2. Install PHP 8.3 + extensions (or newer, change php version)
   * sudo apt install php8.3 php8.3-cli php8.3-common php8.3-mbstring \
   * php8.3-xml php8.3-bcmath php8.3-curl php8.3-zip php8.3-sqlite3 \
   * php8.3-mysql unzip curl git -y
3. Check PHP version
   * php -v
4. Install Composer
   * sudo apt install composer -y
   * composer --version
5. Install Node.js
   * curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   * source ~/.bashrc
6. Install Node 20 (LTS)
    * nvm install 20
    * nvm use 20
    * node -v

## PB-Backend setting up
1. git clone https://github.com/vanemarendajaks-team15/pb-backend.git
2. go to repository folder
    * cd pb-backend
3. create environment file with terminal command
    * cp .env.example .env
4. run commands in terminal
    * php artisan key:generate <- generates application key in .env file
    * php artisan migrate <- migrates user etc tables into sqlite
    * php artisan serve <- runs artisan server on port 8000
### Backend should run on port 8000
* you should see laravel version text in your browser @ http://127.0.0.1:8000/

## PB-Frontend setting up
1. git clone https://github.com/vanemarendajaks-team15/pb-frontend.git
2. go to repository folder
   * cd pb-frontend
3. create environment file with terminal command
   * cp .env.example .env
4. Setup Cloudflare R2
   * All uploaded images sending to Cloudflare R2 bucket using R2-worker method
   * Add r2-worker url to .env file variable VITE_R2_WORKER_URL
5. run commands in terminal
   * npm i <- installs npm
   * composer i <- installs composer
   * npm run dev <i runs vite.js server
6. open another terminal and run command
   * php artisan key:generate <- generates app key
   * php artisan migrate <- migrates database
   * php artisan serve <- runs artisan server on port 8001 <- back runs already on port 8000
### Frontend should run on port 8001
 * You should see welcome page in your browser @ http://127.0.0.1:8001/

## Running the project
1. start apache server for backend
   * php artisan serve
2. start development environment for frontend
   * composer run dev
3. start apache server for frontend
   * php artisan serve
