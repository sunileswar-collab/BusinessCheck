const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Running Company Registration Tests...\n');

// Backend Tests
console.log('📦 Backend Tests:');
try {
  process.chdir(path.join(__dirname, 'BCBackend'));
  execSync('npm test -- --testPathPattern=validation.test.js', { stdio: 'inherit' });
  console.log('✅ Backend validation tests passed!\n');
} catch (error) {
  console.log('❌ Backend tests failed\n');
}

// Frontend Tests (if dependencies are installed)
console.log('🎨 Frontend Tests:');
try {
  process.chdir(path.join(__dirname, 'BCFrontEnd'));
  execSync('npm test -- --passWithNoTests', { stdio: 'inherit' });
  console.log('✅ Frontend tests passed!\n');
} catch (error) {
  console.log('❌ Frontend tests failed or dependencies not installed\n');
}

console.log('🎯 Test Summary Complete!');