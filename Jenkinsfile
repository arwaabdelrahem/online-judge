pipeline {

  environment {
    dockerimagename = "registry.digitalocean.com/online-judge/api:latest"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/arwaabdelrahem/online-judge'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      steps{
        withCredentials([usernamePassword(credentialsId: 'DO', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          // available as an env variable, but will be masked if you try to print it out any which way
          // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
          sh 'echo $PASSWORD'
          // also available as a Groovy variable
          echo USERNAME
          // or inside double quotes for string interpolation
          echo "username is $USERNAME"
          sh "doctl auth init"
          sh "doctl registry login"
          sh "docker push registry.digitalocean.com/online-judge/api:latest"
}
      }
    }

    stage('Deploying container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "kubernetes/configmap.yaml", "kubernetes/deployment.yaml")
        }
      }
    }

  }

}