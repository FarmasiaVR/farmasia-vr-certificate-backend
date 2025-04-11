# Development environments and deploying

## Local development environment
There is a docker-compose.yml file in the repository root to aid local development, but it assumes you have Postgres installed locally.

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

The `app-secrets.yaml.dist` is only provided as an empty version. To populate these secret values they need to be base64 encoded. The keys can be plain regular text but the values are encoded like this (using bash terminal):

`echo -n value-to-be-encoded | base64`

The repository has a GitHub action in place to push the changes to the University's OpenShift testing cluster, where a BuildConfig builds a new image. The deployment needs to be restarted from the OpenShift console for the changes to take effect.

## OpenShift production
Same instructions apply as with staging, but the GitHub actions only push to the production cluster on releases in GitHub. The OpenShift manifest to be used is `openshift-production.yaml`. Secrets need to be set appropriately based on `app-secrets-prod.yaml.dist`. The BuildConfig's reference to a VCS `ref` should be updated to the tag wanted in production.

