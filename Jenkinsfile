pipeline {
    agent any

    tools {
        nodejs 'node' // Make sure "node" matches the name in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from Git
                // Note: Ensure this project is inside a git repository for this step to work.
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Installs modules specified in package.json
                bat 'npm install'
            }
        }
        
        stage('Run Unit Tests') {
            steps {
                // Execute unit tests via mocha
                bat 'npm run test:unit'
            }
        }
        
        stage('Run Integration Tests') {
            steps {
                // Execute integration tests using UI interaction and form submissions
                bat 'npm run test:integration'
            }
        }
        
        stage('Generate Reports') {
            steps {
                // Generates an HTML report via mochawesome
                bat 'npm run test:report'
            }
        }
    }

    post {
        always {
            // Require the HTML Publisher Plugin
            publishHTML([
                allowMissing: true, 
                alwaysLinkToLastBuild: true, 
                keepAll: true, 
                reportDir: 'reports', 
                reportFiles: 'test-report.html', 
                reportName: 'Mocha HTML Report', 
                reportTitles: 'Authentication App Test Execution Report'
            ])
        }
        success {
            echo '✓ All tests passed and pipeline executed successfully!'
        }
        failure {
            echo ' Pipeline failed! Please check the console output and HTML reports.'
        }
    }
}