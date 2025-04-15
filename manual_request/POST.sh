#!/bin/bash

curl -X POST \
-H "Authorization: valokuva" \
-H "Content-Type: application/json" \
--data '{"user":"tester", "process":"progress"}'  \
"https://opetushallinto.cs.helsinki.fi/farmasiavr-backend/api/certificates/create"
