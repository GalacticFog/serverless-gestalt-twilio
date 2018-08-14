# serverless-gestalt-twilio
uses the a custom ui and twilio sdk to send a text message

Make sure you have the [serverless-gestalt](https://github.com/GalacticFog/serverless-gestalt) provider plugin installed

## Configure
You will need to point the serverless.yml to your Gestalt context. Edit the following lines in the `provider` section

```
provider:
  ...
  context: /fqon/workspace.name/environment.name # your context path
  laser: laser-provider-name # the name of the laser provider
  api: api-name # the name of the api under the context
```
## Pre-Req
You'll need a twilop user sid and token

## Install

```
serverless install --url https://github.com/GalacticFog/serverless-gestalt-twilio
cd serverless-gestalt-hello-world
serverless deploy
```

This will create a lambda and endpoint in Gestalt

## Testing
```
laser-execute $(echo `pwd`)/index.js run '{ "msg": "ohh hey!" }' '{ "method" : "POST" }'
```
