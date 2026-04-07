# Node.js Authentication System Testing & CI/CD Pipeline

##  Project Overview
This project is a complete Authentication application built on Node.js and Express. It includes functionalities to handle User Login and User Signup operations securely. Built using modern MVC and routing structures, its architecture divides operations logically across controllers, validation middlewares, and UI endpoints.

##  Testing Purpose
Automation testing is implemented using Mocha and Chai to ensure the stability and reliability of user authentication. The testing utilizes Page Object Model (POM) pattern to separately manage logic for UI abstractions out of test files. Automated tests quickly assert scenarios like form filling, error message verifications, server boundary inputs, duplicate entries, and incorrect login attempts without tedious manual interventions. 

##  Tech Stack
- **Backend:** Node.js, Express
- **Test Framework:** Mocha
- **Assertion Library:** Chai
- **HTTP assertions:** Supertest
- **Test Reporting:** Mochawesome
- **CI/CD:** Jenkins

---

##  Test Summary Table

| Type                  | Count | Status     |
|-----                 -|-------|---------   |
| **Unit Tests**        | 25    | All Passed |
| **Integration Tests** | 18    | All Passed |
| **Total**             | 43    | Passed     |

> *All validations including rapid multi-submit handling, extremely long inputs, empty properties, special characters have been properly fortified and completely pass both the UI routing pipeline and boundary restrictions.*

---

##  Jenkins Pipeline Explanation
## Jenkins Pipeline Explanation

**Jenkins Job Configuration:**
- **Job Name:** Auth-App-Tests
- **Pipeline Script:** Direct pipeline script (no SCM)
- **Workspace Path:** `C:\Users\HC\Desktop\auth-app`

**Pipeline Stages:**

1. **Install Dependencies** 
   - Command: `npm install`
   - Installs all required packages

2. **Run Tests**
   - Command: `npm test`
   - Executes 43 test cases
   - All tests passing 

**Post-Build Actions:**
- Success: Build marked as SUCCESS
- Failure: Build marked as FAILURE

### Author Info
- Name: Marwa Naseem

