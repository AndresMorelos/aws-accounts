# Manage AWS Credentials

[![GitHub license](https://img.shields.io/github/license/AndresMorelos/aws-accounts?style=flat-square)](https://github.com/AndresMorelos/aws-accounts/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/AndresMorelos/aws-accounts?style=flat-square)](https://github.com/AndresMorelos/aws-accounts/stargazers)
[![Version](https://img.shields.io/npm/v/aws-accounts.svg?style=flat-square)](https://www.npmjs.com/package/aws-accounts)
[![npm](https://img.shields.io/npm/dw/aws-accounts?style=flat-square)](https://www.npmjs.com/package/aws-accounts)

* [How to install](#how-to-install)
* [How to use](#how-to-use)
  + [Load profiles from an existing file](#load-profiles-from-an-existing-file)
  + [Get profiles serialized](#get-profiles-serialized)
    - [As a Object](#as-a-object)
    - [As a Text](#as-a-text)
  + [Add a new profile](#add-a-new-profile)
  + [Edit a existing profile](#edit-a-existing-profile)
  + [Switch to an existing profile](#switch-to-an-existing-profile)
  + [Remove a profile](#remove-a-profile)
  + [Save the current profiles to the aws file](#save-the-current-profiles-to-the-aws-file)
  + [Import JSON profile file](#import-json-profile-file)
  + [Export JSON profile file](#export-json-profile-file)

### How to install?

``` sh
npm i aws-accounts
```

## How to use?

### Load profiles from an existing file

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.deserializeCredentials('./path/to/the/file');
```

> **Note:** By the fault the package load the profiles from the default file see [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)

### Get profiles serialized

> **Note:** By default the profiles are serialized as a text

#### As a JSON

``` js
const { awsAccouts } = require('aws-accounts');

awsAccouts.getCredentials('JSON');
```

#### As a Text

``` js
const { awsAccouts } = require('aws-accounts');

awsAccouts.serialize_credentials('TEXT');
```

### Add a new profile

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.addProfile(options);
```

see [Accepted Options](#accepted-options)

### Edit a existing profile

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.editProfile('PROFILE-NAME', options);
```
see [Accepted Options](#accepted-options)

### Switch to an existing profile

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.switchProfile('NAME');
```

### Remove a profile

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.deleteProfile('NAME');
```

### Save the current profiles to the aws file

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.saveFile();
```

> **NOTE:** Be careful with this action, the method overwrite the default AWS profiles file with the loaded profiles.

### Import JSON profile file

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.import_credentials('./path/to/the/file.json');
```

> **NOTE:** The JSON file to import needs to satisfy the package serialization

### Export JSON profile file

``` js
const { awsAccounts } = require('aws-accounts');

awsAccounts.export_credentials('./path/to/the/location/');
```


### Accepted Options

| Option                     | Config Entry          | Type    | Default |
| -------------------------- | --------------------- | ------- | ------- |
| name                       | [name]                | String  | null    |
| aws_access_key_id          | aws_access_key_id     | String  | null    |
| aws_secret_access_key      | aws_secret_access_key | String  | null    |
| region                     | region                | String  | null    |
| output                     | output                | String  | json    |
| cli_timestamp_format       | cli_timestamp_format  | String  | wire    |
| cli_follow_urlparam        | cli_follow_urlparam   | Boolean | true    |
| ca_bundle                  | ca_bundle             | String  | null    |
| parameter_validation       | parameter_validation  | Boolean | true    |
| tcp_keepalive              | tcp_keepalive         | Boolean | true    |
| max_attempts               | max_attempts          | Number  | null    |
| retry_mode                 | retry_mode            | String  | null    |