# Development environments and deploying

## Local development environment
There is a docker-compose.yml file in the repository root to aid local development. 

The React UI needs to be built before starting up the composed environment:

`cd farmasia-ui`

`npm install`

`npm run build`

This creates the /dist folder which the compose environment copies to the container.

To have a full local development environment run the following:

`npm install`

`docker compose up --build`

Make sure to rebuild the image (e.g. by using the `--build` flag on `docker compose up`) if you change the UI code.

Navigate to http://localhost:3001/farmasiavr to see the UI. The setup is like this because in the OpenShift environment a Shibboleth container routes all the traffic to the `/farmasiavr` endpoint.

You can use CTRL+C to shutdown the composed environment.

## OpenShift staging
The `manifests/` directory has a YAML file named `openshift-staging.yaml` which has all the relevant information to setup the required deployments and services. As the application uses the clusters Shibboleth container to route traffic no external routes are required as manifests. 

The `app-secrets.yaml` is only as an empty version at the end of the OpenShift manifests. To populate these secret values they need to be base64 encoded. The keys can be plain regular text but the values are encoded like this (using bash terminal):

`echo -n value-to-be-encoded | base64`

The repository has a GitHub action in place to build and push the backend image to Docker hub repository `farmasiavr/farmasiavr-backend:{github.sha}`. The GitHub SHA being the push checksum hash. Our OpenShift staging app is not yet configured to check the image repo for updates and update the deployment to use the latest image. This should be done with a ImageStream or ImageStreamTag object or by adding the app to the clusters ArgoCD.

The Docker Hub repository used is within a shared account with username `farmasiavr` with email address `farmasiavr2024@gmail.com`. The staging repo is `farmasiavr-backend`.

## OpenShift production
Same instructions apply as with staging, but the GitHub actions make adjustments to the Docker image only on releases in GitHub. The Docker Hub repository used is `farmasiavr-backend-prod`. The OpenShift manifest to be used is `openshift-production.yaml`.

