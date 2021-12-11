node {
    def app

    agent any
    tools {nodejs "default"}
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

                app = docker.build("moorerod/jenkins-node")
            }
        }
        stage('Test Docker Image') {
            steps {
                echo "Testing Docker Image"
                app.inside {
                    sh 'echo "Tests passed"'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                echo "Pushing Docker Image"
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                    app.push("${env.BUILD_NUMBER}")
                    app.push("latest")
        }
            }
        }   
    }
    post {
        success {
            echo 'I succeeded!'
        }
        always {
            junit 'junit-report.xml'
        }
        unstable {
             emailext (
                 to: 'moore.rodney@gmail.com',
                 subject: "${currentBuild.currentResult} Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong with ${env.BUILD_URL}. ${env.JOB_NAME} #${env.BUILD_NUMBER}."

             )
        }
        failure {
            emailext (
                 to: 'moore.rodney@gmail.com',
                 subject: "${currentBuild.currentResult} Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong with ${env.BUILD_URL}. ${env.JOB_NAME} #${env.BUILD_NUMBER}."

            )
        }
        changed {
            echo 'Things were different before...'
        }
    }
}