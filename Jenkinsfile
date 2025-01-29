pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "your-dockerhub-username/react-vite-app"
        BACKEND_IMAGE = "your-dockerhub-username/java-backend-app"
        FRONTEND_CONTAINER_NAME = "frontend_container"
        BACKEND_CONTAINER_NAME = "backend_container"
    }

    stages {
        stage('Clone Repositories') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/frontend-repo.git'
                git branch: 'main', url: 'https://github.com/your-username/backend-repo.git'
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        
                        // Build and push frontend image
                        sh 'docker build -t $FRONTEND_IMAGE ./frontend-repo'
                        sh 'docker push $FRONTEND_IMAGE'

                        // Build and push backend image
                        sh 'docker build -t $BACKEND_IMAGE ./backend-repo'
                        sh 'docker push $BACKEND_IMAGE'
                    }
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                sshagent(['your-ec2-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@your-ec2-public-ip << EOF
                        sudo docker pull $FRONTEND_IMAGE
                        sudo docker pull $BACKEND_IMAGE

                        sudo docker stop $FRONTEND_CONTAINER_NAME || true
                        sudo docker rm $FRONTEND_CONTAINER_NAME || true
                        sudo docker run -d --name $FRONTEND_CONTAINER_NAME -p 80:80 $FRONTEND_IMAGE

                        sudo docker stop $BACKEND_CONTAINER_NAME || true
                        sudo docker rm $BACKEND_CONTAINER_NAME || true
                        sudo docker run -d --name $BACKEND_CONTAINER_NAME -p 8080:8080 $BACKEND_IMAGE
                    EOF
                    '''
                }
            }
        }
    }
}
