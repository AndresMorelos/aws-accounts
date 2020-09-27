const parser = require('../src');
const assert = require('assert');
const {
  deserialize_dump_credentials: deserializeDumpCredentials,
  import_dump_credentials: importDumpCredentials,
  add_profile_dump_credentials: addProfileDumpCredentials,
  serialize_credentials_as_text: serializeCredentialsAsText,
  edit_profile_dump_credentials_profile_name: editProfileDumpCredentialsProfileName,
  edit_profile_dump_credentials_attribute: editProfileDumpCredentialsAttribute,
  delete_profile_dump_credentials: deleteProfileDumpCredentials,
  serialize_credentials_as_object: serializeCredentialsAsObject,
} = require('./constants');

beforeEach(() => {
  parser.cleanCredentials();
});

describe('Test parser functionalities', () => {
  it('Deserialize credentials file', () => {
    parser.deserialize_credentials('./test/objects/credentials');
    assert.deepStrictEqual(parser.getCredentials(), deserializeDumpCredentials);
  });

  it('Import credentials json file', () => {
    parser.import_credentials('./test/objects/credentials.json');
    assert.deepStrictEqual(parser.getCredentials(), importDumpCredentials);
  });

  it('Add a new profile', () => {
    parser.add_profile('TEST-PROFILE', {
      access_key: 'TEST_PROFILE',
      secret_access_key: 'SECRET_KEY',
    });
    assert.deepStrictEqual(parser.getCredentials(), addProfileDumpCredentials);
  });

  it('Delete a existing profile', () => {
    parser.import_credentials('./test/objects/credentials.json');
    parser.delete_profile('personal-account');
    assert.deepStrictEqual(parser.getCredentials(), deleteProfileDumpCredentials);
  });

  it('Save loaded credentials', () => {
    parser.import_credentials('./test/objects/credentials.json');
    assert.strictEqual(parser.save_file(), 1);
  });

  it('Export loaded credentials', () => {
    parser.import_credentials('./test/objects/credentials.json');
    assert.strictEqual(parser.export_credentials('./test/exports'), 1);
  });

  describe('Serialize the loaded profiles', () => {
    it('as a text', () => {
      parser.deserialize_credentials('./test/objects/credentials');
      const credentialsSerialized = parser.serialize_credentials();
      assert.strictEqual(credentialsSerialized, serializeCredentialsAsText);
    });

    it('as a object', () => {
      parser.deserialize_credentials('./test/objects/credentials');
      const credentialsSerialized = parser.serialize_credentials('object');
      assert.deepStrictEqual(credentialsSerialized, serializeCredentialsAsObject);
    });
  });

  describe('Edit a existing profile', () => {
    it('Change the profile name', () => {
      parser.import_credentials('./test/objects/credentials.json');
      parser.edit_profile('default', { new_name: 'default-andres' });
      assert.deepStrictEqual(parser.getCredentials(), editProfileDumpCredentialsProfileName);
    });
    it('Change an attribute value', () => {
      parser.import_credentials('./test/objects/credentials.json');
      parser.edit_profile('default', { access_key: 'AM_TEST' });
      assert.deepStrictEqual(parser.getCredentials(), editProfileDumpCredentialsAttribute);
    });
  });
});
