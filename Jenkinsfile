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
         sh "docker push registry.digitalocean.com/online-judge/api:latest"
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