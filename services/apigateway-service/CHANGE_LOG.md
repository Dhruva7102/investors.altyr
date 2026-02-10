___
# Change Logs
## authCustom, authKeyclock
- added custom and keyclock auth plugin code.


## certs, locales, example
- added certificate, locales, example for auth plugnis

## Dockerfile
- made some changes for file permissions for s3 implementations.

## cmd/krakend-ce/main.go
- changes done for s3 implementations.

## handler_factory.go
- added auth and keyclock plugin in handler_factory.

## executer.go
- added config getter for custom auth server.


## run in local
go mod tidy
go mod vendor
go run cmd/krakend-ce/main.go run -c ./krakend.json
<!-- - reflex -g krakend.json -s -- ./krakend run -c krakend.json -->

## sync with master
 - to add origin into local repo
    git remote add sync git@github.com:krakendio/krakend-ce.git
 - check remote added
    git remote -v
 - fetching all branches from sync
    git fetch sync
 - to pull master into new local branch
    git checkout -b krakend/master sync/master
   or chaeckout to existing master branch
    git checkout krakend/master
 - to pull new changes into krakend/master branch
    git pull sync master

   to push changes into krakend/master branch on bitbucket
    git push origin krakend/master

___
# API Gateway Krakend

Go 1.20.4 is a requirement

## Build
	$ go install .

## Run
	$ go run main.go
	$ go run cmd/krakend-ce/main.go run -c ./krakend.json

## Build Docker image
	$ docker build -t appscrip007/api-gateway .

## Push Image to Docker Hub
	$ docker login --username appscrip007 --password **********
	
# tag it
	$ docker tag appscrip007/api-gateway:latest appscrip007/api-gateway:$version

## Push Image to Docker Hub
	$ docker push appscrip007/api-gateway:latest

## Rest API
The REST API to the example app is described below.
	ex. jwtPort is 8090 and jwtEndpoint is accessKeys

## Get list of Things

### For creating new access and refresh token
#### Request

`POST /accessKeys/`

    curl -X POST -H 'Accept: application/json' -d '{
		"userId": "1",
		"userType": "admin",
		"multiLogin": "true",
		"AllowedMax": "5", // optional
		"immediateRevoke": "false",
		"metaData": {},
		"accessTTL": "48h", // optional
		"refreshTTL": "180h" // optional
	}' http://localhost:8090/accessKeys

#### Response
    Content-Type: application/json
    {
		"data": {
			"accessExpireAt": "Unix timestamp for access token expiry"
			"accessToken": "Access Token",
			"refreshToekn": "Refresh Token"
		},
		"message": "Success"
	}

### For blacklisting refresh token
#### Request

`DELETE /accessKeys/`

    curl -X DELETE -H 'Accept: application/json' -d '{
		"userId": "1",
		"userType": "admin",
		"refreshToken": "*",// Refresh Token or * for all
		"time": "5", // optional, only with one refresh token not for all like *
	}' http://localhost:8090/accessKeys

#### Response
    Content-Type: application/json
    {
		"message": "Success"
	}

### For Creating New Token
#### Request

`GET /accessKeys/`

    curl -X GET 
		-H 'Accept: application/json' 
		-H 'authorization: ACCESS_TOKEN'
		-H 'refreshtoken: REFRESH_TOKEN'
		http://localhost:8090/accessKeys

#### Response
    Content-Type: application/json
    {
		"data": {
			"accessExpireAt": "Unix timestamp for access token expiry"
			"accessToken": "Access Token"
		},
		"message": "Success"
	}