#!/bin/bash

# PHP built-in server'ı başlat
echo "PHP sunucusu başlatılıyor..."
echo "URL: http://localhost:8000"
echo "Durdurmak için Ctrl+C kullanın"

cd api
php -S localhost:8000 