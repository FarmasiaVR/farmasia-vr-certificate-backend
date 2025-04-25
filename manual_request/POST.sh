#!/bin/bash

curl -X POST \
-H "Authorization: valokuva" \
-H "Content-Type: application/json" \
--data '{"email":"mail@example.com","scenario":"Medicine Preparation","progress":[{"name":"Wash hands","completed":false,"awardedPoints":0,"timeTaken":null,"mistakes":[]},{"name":"Fill tubes in under 50 seconds","completed":true,"awardedPoints":50,"timeTaken":15,"mistakes":[{"name":"Spilled liquid","deducted":10},{"name":"Wrong tube!","deducted":15}]}],"mistakes":[{"name":"Hands were contaminated in cabinet","deducted":10},{"name":"Another mistake","deducted":15}]}'  \
"https://opetushallinto.cs.helsinki.fi/farmasiavr-backend/api/certificates/create"
