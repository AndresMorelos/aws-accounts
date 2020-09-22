# Manage AWS Credentials


### How to install?

```sh
npm i manage-aws-credentials
```

## How to use?

### Load profiles from an existing file

```js
 const AWSCredentials = require('manage-aws-credentials');

 AWSCredentials.deserialize_credentials('./path/to/the/file');
```

> **Note:** By the fault the package load the profiles from the default file see [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)


### Add a new profile


```js
 const AWSCredentials = require('manage-aws-credentials');

 AWSCredentials.add_profile('PROFILE-NAME','ACCESS_KEY','SECRET_ACCESS_KEY')
```
> **NOTE:** The profile name needs to accomplish the next regex ^([A-Za-z0-9\-]+)(([A-Za-z0-9\-]+)?)+$ *(number and letters separated by dashes)*

### Save the current profiles to the aws file

```js
 const AWSCredentials = require('manage-aws-credentials');

 AWSCredentials.save_file();
```

> **NOTE:** Be careful with this action, the method overwrite the default AWS profiles file with the loaded profiles.

### Import JSON profile file

```js
 const AWSCredentials = require('manage-aws-credentials');

 AWSCredentials.import_credentials('./path/to/the/file.json');
```

> **NOTE:** The JSON file to import needs to satisfy the package serialization (The export of the loaded profiles to a JSON file will be implemented on the further version)