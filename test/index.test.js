const parser = require('../src')
const assert = require('assert')
const { deserialize_dump_credentials, import_dump_credentials, add_profile_dump_credentials, serialize_credentials, edit_profile_dump_credentials } = require('./constants')


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

    it('Add a new profile', () => {
        parser.add_profile('TEST-PROFILE', { access_key: 'TEST_PROFILE', secret_access_key: 'SECRET_KEY' })
        assert.deepStrictEqual(parser.credentials, add_profile_dump_credentials)
    })

    it('Serialize the loaded profiles', () => {
        parser.deserialize_credentials('./test/objects/credentials')
        const credentials_serialized = parser.serialize_credentials();
        assert.strictEqual(credentials_serialized, serialize_credentials)
    })

    it('Save loaded credentials', () => {
        parser.import_credentials('./test/objects/credentials.json')
        assert.strictEqual(parser.save_file(), 1)
    })

    it('Export loaded credentials', () => {
        parser.import_credentials('./test/objects/credentials.json')
        assert.strictEqual(parser.export_credentials('./test/exports'), 1)
    })

    it('Edit a existing profile', () => {
        parser.import_credentials('./test/objects/credentials.json')
        parser.edit_profile('default', 'default-andres', { access_key: 'AM_TEST' })
        assert.deepStrictEqual(parser.credentials, edit_profile_dump_credentials)
    })
})