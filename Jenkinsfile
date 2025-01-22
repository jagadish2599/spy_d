pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository from GitHub
                git branch: 'main', url: ' https://github.com/jagadish2599/spy_d.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Navigate to the correct directory and run npm install
                dir('/var/lib/jenkins/workspace/Spyd-main') {
                    echo "Aruna@123" | sudo -S npm install -g npm@11.0.0
                }
            }
        }

        stage('Build Project') {
            steps {
                // Navigate to the correct directory and run npm run build
                dir('/var/lib/jenkins/workspace/Spyd-main') {
                    sh 'sudo npm run build'
                }
            }
        }

        stage('Copy to Nginx') {
            steps {
                // Copy the contents of the dist folder to the Nginx HTML directory
                dir('/var/lib/jenkins/workspace/Spyd-main') {
                    sh 'sudo cp -r dist/* /usr/share/nginx/html/'
                }
            }
        }

        stage('Restart Nginx') {
            steps {
                // Restart the Nginx service to apply changes
                sh 'sudo -s systemctl restart nginx'
                
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
