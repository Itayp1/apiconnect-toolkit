pipeline {
    agent any
      tools {nodejs 'NodeJs' }

    stages {
        stage('Build') {
            steps {


                sh 'apic login --server=apimanager.eu-gb.apiconnect.cloud.ibm.com  --apikey=W_KZtnNjyKAA_SKCUU1F5bbP8_Y_p25UrvWS86vTU4uy'
                sh  'apic catalogs --all-organizations --server=apimanager.eu-gb.apiconnect.cloud.ibm.com'
            }
        }
        stage('Test') {
            steps {
                echo 'Test 2232s'
            }
        }
        stage('Deploy') {
            steps {


                echo 'finish 223'




            }
        }
    }
}