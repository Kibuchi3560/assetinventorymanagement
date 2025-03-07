// AppStructure.test.js
const fs = require('fs');
const path = require('path');

describe('App.js Structure', () => {
  let appContent;
  
  beforeAll(() => {
    // Adjust the file path as necessary.
    const appPath = path.join(__dirname, 'App.js');
    appContent = fs.readFileSync(appPath, 'utf8');
  });

  test('should import React with useState and useEffect', () => {
    const regex = /import\s+React,\s*{[^}]*useState[^}]*useEffect[^}]*}\s*from\s*['"]react['"]/;
    expect(appContent).toMatch(regex);
  });

  test('should import BrowserRouter as Router, Routes, Route, and Navigate from react-router-dom', () => {
    const regex = /import\s+{[^}]*BrowserRouter\s+as\s+Router[^}]*Routes[^}]*Route[^}]*Navigate[^}]*}\s*from\s*['"]react-router-dom['"]/;
    expect(appContent).toMatch(regex);
  });

  test('should import useSelector from react-redux', () => {
    const regex = /import\s+{[^}]*useSelector[^}]*}\s*from\s*['"]react-redux['"]/;
    expect(appContent).toMatch(regex);
  });

 

  test('should use <Routes> in the JSX', () => {
    expect(appContent).toMatch(/<Routes>/);
  });
});
