const path = require('path');
const os = require('os');

module.exports = {
  TYPES: {
    ATTRIBUTE: 'ATTRIBUTE',
    PROFILE: 'PROFILE',
    BREAK_LINE: 'BREAK_LINE',
  },
  VERIFICATIONS: {
    COMMENT: ';',
    EQUALS: '=',
  },
  ATTRIBUTES: {
    AWS_ACCESS_KEY_ID: 'aws_access_key_id',
    AWS_SECRET_ACCESS_KEY: 'aws_secret_access_key',
    REGION: 'region',
    OUTPUT: 'output',
    CLI_TIMESTAMP_FORMAT: 'cli_timestamp_format',
    CLI_FOLLOW_URLPARAM: 'cli_follow_urlparam',
    CA_BUNDLE: 'ca_bundle',
    PARAMETER_VALIDATION: 'parameter_validation',
    TCP_KEEPALIVE: 'tcp_keepalive',
    MAX_ATTEMPTS: 'max_attempts',
    RETRY_MODE: 'retry_mode',
  },
  GENERAL_OPTIONS: {
    OUTPUT: {
      JSON: 'json',
      TABLE: 'table',
      TEXT: 'text',
    },
    CLI_TIMESTAMP_FORMAT: {
      WIRE: 'wire',
      ISO8601: 'iso8601',
    },
  },
  credentials_default_directory: path.join(os.homedir(), '.aws'),
  credentials_default_path: path.join(os.homedir(), '.aws', 'credentials'),
};
