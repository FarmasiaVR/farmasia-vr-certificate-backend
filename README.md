# FarmasiaVR backend
This repository houses the FarmasiaVR backend. The backend is intented to send info to faculty members about students passing an educational scenario within FarmasiaVR game. The backend also has a UI for changing authentication password which the game uses when sending info of the game scenarios and ability to change the email to which the results are sent. The address to which the reports of passing a scenario are sent can also be changed in the UI. 

[For development](https://github.com/FarmasiaVR/farmasia-vr-certificate-backend/blob/main/docs/for_developers.md)

## Architechture
The backend runs within the HY Openshift platform as a NodeJS container with a React Vite UI. Database being used is a MongoDB non-relational document database. Redis is used as a session storage.

HY user authentication is done with Shibboleth. 

## Requirements
No sensitive information should be saved. Only the faculty email address to which the reports are sent to and the password needed for authentication in the POST request are saved within the database. 

Within the backend UI an authentication for HY faculty who can manage the email address and auth password.

Compliance with HY Openshift platform rules. Meaning reasonable resource requests, using the HY storage for db and HTTPS for requests outside of the cluster. 