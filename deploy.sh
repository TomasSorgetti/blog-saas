
cd projects/blog-saas || exit

git pull origin main

docker compose up -d --build
