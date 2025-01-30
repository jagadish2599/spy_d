pipeline {
    agent any

    environment {
        IMAGE_NAME = "jagadish250899/react-vite-app"
        CONTAINER_NAME = "react-vite-container"
        DOCKER_USER = credentials('DOCKERHUB_USERNAME')
        DOCKER_PASS = credentials('DOCKERHUB_PASSWORD')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/jagadish2599/spy_d.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_NAME
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@your-ec2-ip << EOF
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                        docker pull $IMAGE_NAME
                        docker run -d -p 80:80 --name $CONTAINER_NAME $IMAGE_NAME
                        EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
