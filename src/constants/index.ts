export const GENERAL_OPTIONS = {
  OUTPUT: {
    JSON: 'json',
    TABLE: 'table',
    TEXT: 'text',
  },
  CLI_TIMESTAMP_FORMAT: {
    WIRE: 'wire',
    ISO8601: 'iso8601',
  },
};

export const VERIFICATIONS = {
  COMMENT: ';',
  EQUALS: '=',
}

export const CredentialExports = {
  JSON: 'JSON',
  TEXT: 'TEXT'
}

export type ProfileOptions = {
  output?: string;
  cli_timestamp_format?: string;
  cli_follow_urlparam?: boolean;
  parameter_validation?: boolean;
  tcp_keepalive?: boolean;
  max_attempts?: number;
  name: string;
  aws_access_key_id: string;
  aws_secret_access_key: string;
  region?: string | undefined;
  ca_bundle?: string | undefined;
  retry_mode?: string | undefined;
}

export type EditProfileOptions = {
  output?: string;
  cli_timestamp_format?: string;
  cli_follow_urlparam?: boolean;
  parameter_validation?: boolean;
  tcp_keepalive?: boolean;
  max_attempts?: number;
  name?: string;
  aws_access_key_id?: string;
  aws_secret_access_key?: string;
  region?: string | undefined;
  ca_bundle?: string | undefined;
  retry_mode?: string | undefined;
}

export const REGIONS = {
  US_EAST_1: 'us-east-1',
  US_EAST_2: 'us-east-2',
  US_WEST_1: 'us-west-1',
  US_WEST_2: 'us-west-2',
  US_GOV_WEST_1: 'us-gov-west-1',
  CA_CENTRAL_1: 'ca-central-1',
  EU_WEST_1: 'eu-west-1',
  EU_WEST_2: 'eu-west-2',
  EU_CENTRAL_1: 'eu-central-1',
  AP_SOUTHEAST_1: 'ap-southeast-1',
  AP_SOUTHEAST_2: 'ap-southeast-2',
  AP_SOUTH_1: 'ap-south-1',
  AP_NORTHEAST_1: 'ap-northeast-1',
  AP_NORTHEAST_2: 'ap-northeast-2',
  SA_EAST_1: 'sa-east-1',
  CN_NORTH_1: 'cn-north-1',
}