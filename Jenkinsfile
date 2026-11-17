
pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Downloading project from GitHub'
                git branch: 'main',
                    url: 'https://github.com/hussainmaloth1322/Student-Details-Form-Main.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies'
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image'
                bat 'docker build -t student-details-form:latest .'
            }
        }

        stage('Run Docker Container') {
            steps {
                echo 'Creating and running Docker container'

                bat '''
                powershell -NoProfile -Command "$c = docker ps -aq --filter 'name=^/student-details-form-container$'; if ($c) { docker rm -f student-details-form-container }"

                docker run -d --name student-details-form-container -p 8082:3000 student-details-form:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL!'
            echo 'Student Details Form is running on port 8082'
        }

        failure {
            echo 'BUILD FAILED! Check Jenkins Console Output.'
        }
    }
}
