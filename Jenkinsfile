pipeline {

  agent any
  tools {
    nodejs 'Node'
  }

  stages {
    stage("build") {
      steps {
        echo 'Test'
      }
    }
    stage("build image") {
      steps {
        echo 'Test'
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
        echo 'Test'
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