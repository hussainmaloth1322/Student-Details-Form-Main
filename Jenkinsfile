pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install Dependencies') {
            steps { bat 'npm install' }
        }
        stage('Build Docker Image') {
            steps { bat 'docker build -t student-details-form .' }
        }
        stage('Run Docker Container') {
            steps {
                bat 'docker rm -f student-details-form-container || exit /b 0'
                bat 'docker run -d -p 8082:3000 --name student-details-form-container student-details-form'
            }
        }
    }
}
