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

 AWSCredentials.add_profile('PROFILE-NAME',options)
```
> **NOTE:** The profile name needs to accomplish the next regex ^([A-Za-z0-9\-]+)(([A-Za-z0-9\-]+)?)+$ *(number and letters separated by dashes)*

### Accepted Options 

| Option               | Config Entry          | Type           | Default |
|----------------------|-----------------------|----------------|---------|
| access_key           | aws_access_key_id     | String         | null    |
| secret_access_key    | aws_secret_access_key | String         | null    |
| region               | region                | String         | null    |
| output               | output                | String         | json    |
| cli_timestamp_format | cli_timestamp_format  | String         | none    |
| cli_follow_urlparam  | cli_follow_urlparam   | Boolean        | true    |
| ca_bundle            | ca_bundle             | String | Path | null    |
| parameter_validation | parameter_validation  | Boolean        | true    |
| tcp_keepalive        | tcp_keepalive         | Boolean        | true    |
| max_attempts         | max_attempts          | Number         | null    |
| retry_mode           | retry_mode            | String         | null    |


### Edit a existing profile
```js
 const AWSCredentials = require('manage-aws-credentials');

 AWSCredentials.edit_profile('PROFILE-NAME',options)
```
> **NOTE:** The new profile name needs to accomplish the next regex ^([A-Za-z0-9\-]+)(([A-Za-z0-9\-]+)?)+$ *(number and letters separated by dashes)*

### Accepted Options 

| Option               | Config Entry          | Type           | Default |
|----------------------|-----------------------|----------------|---------|
| access_key           | aws_access_key_id     | String         | null    |
| secret_access_key    | aws_secret_access_key | String         | null    |
| region               | region                | String         | null    |
| output               | output                | String         | json    |
| cli_timestamp_format | cli_timestamp_format  | String         | none    |
| cli_follow_urlparam  | cli_follow_urlparam   | Boolean        | true    |
| ca_bundle            | ca_bundle             | String | Path | null    |
| parameter_validation | parameter_validation  | Boolean        | true    |
| tcp_keepalive        | tcp_keepalive         | Boolean        | true    |
| max_attempts         | max_attempts          | Number         | null    |
| retry_mode           | retry_mode            | String         | null    |
| new_name             |                       | String         | null    |


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

> **NOTE:** The JSON file to import needs to satisfy the package serialization

### Export JSON profile file

```js
 const AWSCredentials = require('manage-aws-credentials');

 AWSCredentials.export_credentials('./path/to/the/location/');
```