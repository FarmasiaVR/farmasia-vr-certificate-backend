#!/bin/bash

curl -X POST \
-H "Authorization: valokuva" \
-H "Content-Type: application/json" \
--data '{"user":"tester", "process":"progress"}'  \
https://shibboleth.ext.ocp-test-0.k8s.it.helsinki.fi/farmasiavr-backend/api/certificates/create