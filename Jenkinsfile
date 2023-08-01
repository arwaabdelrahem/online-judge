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
      environment {
              registryCredential = 'DO'
           }
      steps{
        script {
          docker.withRegistry( 'registry.digitalocean.com/online-judge/api', registryCredential ) {
            dockerImage.push("latest")
          }
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