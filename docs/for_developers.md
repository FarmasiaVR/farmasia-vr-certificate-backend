# Development

## Local development
There is a docker-compose.yml file in the repository root which can be used to aid local development. To have a full local development environment running you need to have Docker running and use the following command in your terminal of choice:

**docker compose -f docker-compose.yml up --build**

You can use CTRL+C to shutdown the composed environment.

## Openshift staging
The manifests folder in the repository has a YAML file named openshift-staging.yaml which has all the relevant information to setup the required deployments, services and routes (one route for external internet access to UI). 

The app-secrets.yaml is only as an empty version at the end of the openshift manifests. To populate these secret values they need to be base64 encoded. The keys can be plain regular text but the values are encoded like this (using bash terminal):

**echo -n value-to-be-encoded | base64**

The repository has a Github action in place to build and push the backend image to Docker hub repository farmasiavr/farmasiavr-backend:{github.sha}. The Github sha being the push checksum hash. Our Openshift staging app is configured to check the image repo for updates and update the deployment to use the latest image. 

The Docker hub repository used is within a shared account with username farmasiavr with email address farmasiavr2024@gmail.com. The staging repo is farmasiavr-backend. 

## Openshift production
Same instructions apply as with staging, but the Github actions make adjustments to the Docker image only on releases in Github. The Docker hub repository used is farmasiavr-backend-prod. The Openshift manifest to be used is openshift-production.yaml.
