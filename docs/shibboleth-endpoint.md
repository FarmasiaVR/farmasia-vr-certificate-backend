# Accessing the staging app

The staging version of the application is available at https://shibboleth.ext.ocp-test-0.k8s.it.helsinki.fi/farmasiavr.

Testing credentials can be obtained from the [SP Registry](https://sp-registry.it.helsinki.fi). You need to be added to the correct University of Helsinki IAM group to be able to use this service.

The FarmasiaVR game should send POST requests to https://shibboleth.ext.ocp-test-0.k8s.it.helsinki.fi/farmasiavr-backend, which bypasses Shibboleth authentication.

# Accessing the production app

The app is not yet running on the production cluster.