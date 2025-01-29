pipeline {
    agent any

    environment {
        IMAGE_NAME = "${DOCKER_USERNAME}/spyd-app:latest" // Correct image name format
        CONTAINER_NAME = "spyd-container"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/jagadish2599/spy_d.git'
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    // Using withCredentials to securely manage DockerHub credentials
                    withCredentials([string(credentialsId: 'DOCKERHUB_USERNAME', variable: 'DOCKER_USERNAME'),
                                      string(credentialsId: 'DOCKERHUB_PASSWORD', variable: 'DOCKER_PASSWORD')]) {
                        // Login to DockerHub using credentials
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Debugging: Confirm the value of DOCKER_USERNAME and IMAGE_NAME
                sh 'echo "DOCKER_USERNAME is $DOCKER_USERNAME"'
                sh 'echo "IMAGE_NAME is $IMAGE_NAME"'

                // Building the Docker image with the proper format and 'latest' tag
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                // Ensure the Docker image exists before pushing
                sh 'docker images | grep "$IMAGE_NAME" || { echo "Image not found!"; exit 1; }'
                
                // Push the built Docker image to DockerHub
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Deploy Container') {
            steps {
                // Stop and remove the existing container (if any)
                sh 'docker stop $CONTAINER_NAME || true'
                sh 'docker rm $CONTAINER_NAME || true'

                // Deploy the Docker container with the image we just built and pushed
                sh 'docker run -d -p 80:80 --name $CONTAINER_NAME $IMAGE_NAME'
            }
        }
    }

    post {
        failure {
            // Clean up Docker resources on failure
            echo 'Build or Deployment failed, cleaning up Docker containers and images.'
            sh 'docker rm -f $CONTAINER_NAME || true'
            sh 'docker rmi -f $IMAGE_NAME || true'
        }
    }
}
