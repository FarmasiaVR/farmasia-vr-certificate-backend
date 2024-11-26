# FarmasiaVR backend
This repository houses the FarmasiaVR backend. The backend is intented to send info to faculty members of students passing an educational scenario within FarmasiaVR game. The backend also has a UI for changing authentication password which the game uses when sending info of the game scenarios.

## Architechture
The backend runs within the HY Openshift platform as a NodeJS container with a React Vite UI. Database being used is a MongoDB non-relational document database.

Redis sessionmanagement within UI (TBD)

HY user authentication (OICD or Shibboleth TBD)