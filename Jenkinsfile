pipeline {
  agent any

  tools {
    nodejs 'Node'
  }

  environment {
    MONGO_DB = 'mapua'
    MONGO_HOSTNAME = 'mapua-cluster.uhph9.mongodb.net'
  }

  stages {
    stage("add credentials to the backend") {
      steps {
        withCredentials([usernamePassword(credentialsId: 'mongodb-user', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
          dir("backend") {
            sh 'echo "MONGO_PASSWORD=${PASSWORD}\nMONGO_USERNAME=${USER}\nMONGO_DB=${MONGO_DB}\nMONGO_HOSTNAME=${MONGO_HOSTNAME}" > .env'
          }
        }
        // withCredentials([usernamePassword(credentialsId: 'docker-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        //   dir("backend") {
        //     sh 'docker build -t niukjs/mapua-backend:1.0 .'
        //     sh "echo $PASS | docker login -u $USER --password-stdin"
        //     sh "docker push niukjs/mapua-backend:1.0"
        //   }
        // }
      }
    }
    stage("deploy") {
      steps {
        script {
          def dockerComposeCmd = "docker-compose -f docker-compose.yml up -d"
          sshagent(['aws-ec2']) {
              sh "scp docker-compose.yml ec2-user@3.126.245.53:/home/ec2-user"
              sh "ssh -o StrictHostKeyChecking=no ec2-user@3.126.245.53 ${dockerComposeCmd}"
          }
        }
      }
    }
  }
  // post {
  //   always {

  //   }
  //   success {

  //   }
  //   failure {

  //   }
  // }
}