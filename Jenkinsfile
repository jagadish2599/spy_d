pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/jagadish2599/spy_d.git'
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'DOCKERHUB_USERNAME', variable: 'DOCKER_USERNAME'),
                                      string(credentialsId: 'DOCKERHUB_PASSWORD', variable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_USERNAME/react-vite-app .'
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                sh 'docker push $DOCKER_USERNAME/react-vite-app'
            }
        }

        stage('Deploy Container') {
            steps {
                sh 'docker stop react-vite-container || true'
                sh 'docker rm react-vite-container || true'
                sh 'docker run -d -p 80:80 --name react-vite-container $DOCKER_USERNAME/react-vite-app'
            }
        }
    }
}
