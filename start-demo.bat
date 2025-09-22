@echo off
echo 🚀 Starting Company Registration Demo...
echo.

echo 📦 Starting Backend Server...
start "Backend Server" cmd /k "cd BCBackend && npm run dev"

timeout /t 3 /nobreak > nul

echo 🎨 Starting Frontend Server...
start "Frontend Server" cmd /k "cd BCFrontEnd && npm run dev"

echo.
echo ✅ Demo servers are starting...
echo 📊 Backend: http://localhost:5000
echo 🎨 Frontend: http://localhost:5173
echo 📋 Health Check: http://localhost:5000/health
echo.
echo 📝 Import Postman collection: Company_Registration_API.postman_collection.json
echo 🗄️ Database: Import company_db.sql into PostgreSQL
echo.
pause