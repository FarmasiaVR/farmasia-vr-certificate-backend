#!/bin/bash

curl -X POST \
-H "Authorization: kokeilukaveri" \
-H "Content-Type: application/json" \
--data '{"email":"mail@example.com","scenario":"Medicine Preparation","progress":[{"name":"Wash hands","completed":false,"awardedPoints":0,"timeTaken":null,"mistakes":[]},{"name":"Fill tubes in under 50 seconds","completed":true,"awardedPoints":50,"timeTaken":15,"mistakes":[{"name":"Spilled liquid","pointsDeducted":10},{"name":"Wrong tube!","pointsDeducted":15}]}],"mistakes":[{"name":"Hands were contaminated in cabinet","pointsDeducted":10},{"name":"Another mistake","pointsDeducted":15}]}'  \
"https://shibboleth.ext.ocp-test-0.k8s.it.helsinki.fi/farmasiavr-backend/api/certificates/create"
