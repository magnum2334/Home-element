# ¡Despliega!

Run composer

    $ composer install
    $ php artisan key:generate
    $ php artisan jwt:secret
   
    
## Now create the database and name it correctly in the .env file
    $ php artisan migrate
        
## Now run the fake data to interact 

    $ php artisan db:seed --class=ProductSeeder
    $ php artisan db:seed --class=UserSeeder
    
## ¡With this configuration you can now run!
    
    $ php artisan serve
