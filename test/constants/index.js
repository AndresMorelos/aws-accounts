module.exports = {
  deserialize_dump_credentials: [
    {
      type: 'PROFILE',
      name: '[default]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<DEFAULT_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<DEFAULT_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[personal-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<PERSONAL_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<PERSONAL_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[work-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
      ],
    },
  ],
  import_dump_credentials: [
    {
      type: 'PROFILE',
      name: '[default]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<DEFAULT_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<DEFAULT_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[personal-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<PERSONAL_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<PERSONAL_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[work-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key_TEST',
          value: '<WORK_SECRET_ACCESS_KEY_TEST>',
        },
      ],
    },
  ],
  add_profile_dump_credentials: [
    {
      type: 'PROFILE',
      name: '[TEST-PROFILE]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: 'TEST_PROFILE',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: 'SECRET_KEY',
        },
        {
          key: 'output',
          type: 'ATTRIBUTE',
          value: 'json',
        },
        {
          key: 'cli_timestamp_format',
          type: 'ATTRIBUTE',
          value: 'wire',
        },
        {
          key: 'cli_follow_urlparam',
          type: 'ATTRIBUTE',
          value: true,
        },
        {
          key: 'parameter_validation',
          type: 'ATTRIBUTE',
          value: true,
        },
        {
          key: 'tcp_keepalive',
          type: 'ATTRIBUTE',
          value: true,
        },
      ],
    },
  ],
  edit_profile_dump_credentials_profile_name: [
    {
      type: 'PROFILE',
      name: '[default-andres]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<DEFAULT_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<DEFAULT_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[personal-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<PERSONAL_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<PERSONAL_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[work-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key_TEST',
          value: '<WORK_SECRET_ACCESS_KEY_TEST>',
        },
      ],
    },
  ],
  edit_profile_dump_credentials_attribute: [
    {
      type: 'PROFILE',
      name: '[default]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: 'AM_TEST',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<DEFAULT_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[personal-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<PERSONAL_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<PERSONAL_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[work-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key_TEST',
          value: '<WORK_SECRET_ACCESS_KEY_TEST>',
        },
      ],
    },
  ],
  delete_profile_dump_credentials: [
    {
      type: 'PROFILE',
      name: '[default]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<DEFAULT_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<DEFAULT_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[work-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key_TEST',
          value: '<WORK_SECRET_ACCESS_KEY_TEST>',
        },
      ],
    },
  ],
  switch_profile_personal_account: [
    {
      type: 'PROFILE',
      name: '[default]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<PERSONAL_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<PERSONAL_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[personal-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<PERSONAL_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<PERSONAL_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[work-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key_TEST',
          value: '<WORK_SECRET_ACCESS_KEY_TEST>',
        },
      ],
    },
  ],
  switch_work_personal_account: [
    {
      type: 'PROFILE',
      name: '[default]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[personal-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<PERSONAL_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<PERSONAL_SECRET_ACCESS_KEY>',
        },
      ],
    },
    {
      type: 'PROFILE',
      name: '[work-account]',
      attributes: [
        {
          type: 'ATTRIBUTE',
          key: 'aws_access_key_id',
          value: '<WORK_ACCESS_KEY_ID>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key',
          value: '<WORK_SECRET_ACCESS_KEY>',
        },
        {
          type: 'ATTRIBUTE',
          key: 'aws_secret_access_key_TEST',
          value: '<WORK_SECRET_ACCESS_KEY_TEST>',
        },
      ],
    },
  ],
  serialize_credentials_as_text:
    '[default]\n' +
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
    '\n',
  serialize_credentials_as_object: [
    {
      name: '[default]',
      access_key: '<DEFAULT_ACCESS_KEY_ID>',
      secret_access_key: '<DEFAULT_SECRET_ACCESS_KEY>',
    },
    {
      name: '[personal-account]',
      access_key: '<PERSONAL_ACCESS_KEY_ID>',
      secret_access_key: '<PERSONAL_SECRET_ACCESS_KEY>',
    },
    {
      name: '[work-account]',
      access_key: '<WORK_ACCESS_KEY_ID>',
      secret_access_key: '<WORK_SECRET_ACCESS_KEY>',
    },
  ],
};
