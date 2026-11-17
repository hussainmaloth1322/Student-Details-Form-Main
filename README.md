# External 10 – Student Details Form

## Aim
Create an HTML form to collect student details and validate mandatory fields using JavaScript. Upload the source code to GitHub, configure Jenkins, and create/run a Docker container.

## Requirements
Node.js, NPM, Git, Docker Desktop, and Jenkins.

## Run with NPM (Windows CMD)
Open CMD in this folder and run:
```cmd
npm install
npm start
```
Open http://localhost:3000

## Git and GitHub
Create an empty GitHub repository, then run:
```cmd
git init
git add .
git commit -m "Student details form"
git branch -M main
git remote add origin https://github.com/USERNAME/Student-Details-Form.git
git push -u origin main
```
Replace USERNAME with your GitHub username.

## Docker
Start Docker Desktop, then run:
```cmd
docker build -t student-details-form .
docker run -d -p 8082:3000 --name student-details-form-container student-details-form
```
Open http://localhost:8082
Stop/remove:
```cmd
docker rm -f student-details-form-container
```

## Jenkins
This Jenkinsfile uses Windows `bat` commands. Push the project to GitHub. In Jenkins:
1. New Item -> Pipeline.
2. Select Pipeline script from SCM.
3. SCM: Git; enter repository URL; branch: */main.
4. Script Path: Jenkinsfile. Save -> Build Now.
5. Jenkins agent needs Git, Node.js, NPM and Docker in PATH; Docker Desktop must be running.

Pipeline stages: Checkout, NPM install, Docker image build, Docker container run.

## Expected result
Blank fields: "Please fill all mandatory fields."
Valid details: "Student details submitted successfully!"

This lab demo validates submissions but does not save records in a database.
