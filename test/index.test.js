const parser = require('../src/index')
const assert = require('assert')


const deserialize_dump_credentials = [
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
]

const import_dump_credentials = [
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
]

beforeEach(() => {
    parser.credentials = []
});

describe('Test parser functionality', () => {
    it('Deserialize credentials file', () => {
        parser.deserialize_credentials('./test/objects/credentials')
        assert.deepStrictEqual(parser.credentials, deserialize_dump_credentials)
       
    })

    it('Import credentials json file', () => {
        parser.import_credentials('./test/objects/credentials.json')
        assert.deepStrictEqual(parser.credentials, import_dump_credentials)
      
    })
})