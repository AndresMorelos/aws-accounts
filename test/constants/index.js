module.exports = {
    deserialize_dump_credentials: [
        {
            "type": "PROFILE",
            "name": "[default]",
            "attributes": [
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_access_key_id",
                    "value": "<DEFAULT_ACCESS_KEY_ID>"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key",
                    "value": "<DEFAULT_SECRET_ACCESS_KEY>"
                }
            ]
        },
        {
            "type": "PROFILE",
            "name": "[personal-account]",
            "attributes": [
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_access_key_id",
                    "value": "<PERSONAL_ACCESS_KEY_ID>"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key",
                    "value": "<PERSONAL_SECRET_ACCESS_KEY>"
                }
            ]
        },
        {
            "type": "PROFILE",
            "name": "[work-account]",
            "attributes": [
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_access_key_id",
                    "value": "<WORK_ACCESS_KEY_ID>"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key",
                    "value": "<WORK_SECRET_ACCESS_KEY>"
                }
            ]
        }
    ],

    import_dump_credentials: [
        {
            "type": "PROFILE",
            "name": "[default]",
            "attributes": [
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_access_key_id",
                    "value": "<DEFAULT_ACCESS_KEY_ID>"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key",
                    "value": "<DEFAULT_SECRET_ACCESS_KEY>"
                }
            ]
        },
        {
            "type": "PROFILE",
            "name": "[personal-account]",
            "attributes": [
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_access_key_id",
                    "value": "<PERSONAL_ACCESS_KEY_ID>"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key",
                    "value": "<PERSONAL_SECRET_ACCESS_KEY>"
                }
            ]
        },
        {
            "type": "PROFILE",
            "name": "[work-account]",
            "attributes": [
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_access_key_id",
                    "value": "<WORK_ACCESS_KEY_ID>"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key",
                    "value": "<WORK_SECRET_ACCESS_KEY>"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key_TEST",
                    "value": "<WORK_SECRET_ACCESS_KEY_TEST>"
                }
            ]
        }
    ],
    add_profile_dump_credentials: [
        {
            "type": "PROFILE",
            "name": "[TEST-PROFILE]",
            "attributes": [
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_access_key_id",
                    "value": "TEST_PROFILE"
                },
                {
                    "type": "ATTRIBUTE",
                    "key": "aws_secret_access_key",
                    "value": "SECRET_KEY"
                },
                {
                    "key": "output",
                    "type": "ATTRIBUTE",
                    "value": "json"
                },
                {
                    "key": "cli_timestamp_format",
                    "type": "ATTRIBUTE",
                    "value": "none"
                },
                {
                    "key": "cli_follow_urlparam",
                    "type": "ATTRIBUTE",
                    "value": true
                },
                {
                    "key": "parameter_validation",
                    "type": "ATTRIBUTE",
                    "value": true
                },
                {
                    "key": "tcp_keepalive",
                    "type": "ATTRIBUTE",
                    "value": true
                }
            ]
        }
    ],
    serialize_credentials: '[default]\n' +
        'aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>\n' +
        'aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>\n' +
        '\n' +
        '\n' +
        '[personal-account]\n' +
        'aws_access_key_id = <PERSONAL_ACCESS_KEY_ID>\n' +
        'aws_secret_access_key = <PERSONAL_SECRET_ACCESS_KEY>\n' +
        '\n' +
        '\n' +
        '[work-account]\n' +
        'aws_access_key_id = <WORK_ACCESS_KEY_ID>\n' +
        'aws_secret_access_key = <WORK_SECRET_ACCESS_KEY>\n' +
        '\n'
}


