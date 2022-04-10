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
    stage("build") {
      steps {
        echo 'Test'
      }
    }
    stage("build image") {
      steps {
        withCredentials([usernamePassword(credentialsId: 'mongodb-user', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
          dir("backend") {
            sh 'echo "MONGO_PASSWORD=${PASSWORD}\nMONGO_USERNAME=${USER}\nMONGO_DB=${MONGO_DB}\nMONGO_HOSTNAME=${MONGO_HOSTNAME}" > .env'
          }
        }
        withCredentials([usernamePassword(credentialsId: 'docker-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
          dir("backend") {
            sh 'docker build -t niukjs/mapua-backend:1.0 .'
            sh "echo $PASS | docker login -u $USER --password-stdin"
            sh "docker push niukjs/mapua-backend:1.0"
          }
        }
      }
    }
    stage("deploy") {
      steps {
        script {
          def dockerCmd = 'docker run -p 3000:3000 -d niukjs/mapua-backend:1.0'
          sshagent(['aws-ec2']) {
              sh "ssh -o StrictHostKeyChecking=no ec2-user@3.126.245.53 ${dockerCmd}"
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