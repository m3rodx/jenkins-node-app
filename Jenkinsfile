pipeline {
    agent any
    tools {nodejs "default"}
    environment {
        CI = 'true'
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test with Mocha') {
            steps {
                sh 'MOCHA_FILE=./junit-report.xml ./node_modules/.bin/mocha test --reporter mocha-junit-reporter --exit'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image"
            }
        }
        stage('Push Docker Image') {
            steps {
                echo "Pushing Docker Image"
            }
        }   
    }
    post {
        always {
            junit 'junit-report.xml'
        }
        success {
            echo 'I succeeded!'
        }
        unstable {
             mail to: 'moore.rodney@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}. ${env.JOB_NAME} #${env.BUILD_NUMBER}."
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }
}