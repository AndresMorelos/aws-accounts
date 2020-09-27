const { TYPES, ATTRIBUTES } = require('../constants');

const get_attribute_list = (options) => {
  const attributes = [];
  for (let i = 0; i < Object.entries(options).length; i++) {
    const [key, value] = Object.entries(options)[i];

    const attribute = {
      type: TYPES.ATTRIBUTE,
      key: null,
      value,
    };

    if (value != null) {
      switch (key) {
        case 'access_key':
          attribute.key = ATTRIBUTES.AWS_ACCESS_KEY_ID;
          break;
        case 'secret_access_key':
          attribute.key = ATTRIBUTES.AWS_SECRET_ACCESS_KEY;
          break;
        case 'region':
          attribute.key = ATTRIBUTES.REGION;
          break;
        case 'output':
          attribute.key = ATTRIBUTES.OUTPUT;
          break;
        case 'cli_timestamp_format':
          attribute.key = ATTRIBUTES.CLI_TIMESTAMP_FORMAT;
          break;
        case 'cli_follow_urlparam':
          attribute.key = ATTRIBUTES.CLI_FOLLOW_URLPARAM;
          break;
        case 'ca_bundle':
          attribute.key = ATTRIBUTES.CA_BUNDLE;
          break;
        case 'parameter_validation':
          attribute.key = ATTRIBUTES.PARAMETER_VALIDATION;
          break;
        case 'tcp_keepalive':
          attribute.key = ATTRIBUTES.TCP_KEEPALIVE;
          break;
        case 'max_attempts':
          attribute.key = ATTRIBUTES.MAX_ATTEMPTS;
          break;
        case 'retry_mode':
          attribute.key = ATTRIBUTES.RETRY_MODE;
          break;
        default:
          break;
      }
      attributes.push(attribute);
    }
  }

  return attributes;
};

const get_attribute_option = (attribute) => {
  switch (attribute) {
    case ATTRIBUTES.AWS_ACCESS_KEY_ID: {
      return 'access_key';
    }
    case ATTRIBUTES.AWS_SECRET_ACCESS_KEY: {
      return 'secret_access_key';
    }
    case ATTRIBUTES.REGION: {
      return 'region';
    }
    case ATTRIBUTES.OUTPUT: {
      return 'output';
    }
    case ATTRIBUTES.CLI_TIMESTAMP_FORMAT: {
      return 'cli_timestamp_format';
    }
    case ATTRIBUTES.CLI_FOLLOW_URLPARAM: {
      return 'cli_follow_urlparam';
    }
    case ATTRIBUTES.CA_BUNDLE: {
      return 'ca_bundle';
    }
    case ATTRIBUTES.PARAMETER_VALIDATION: {
      return 'parameter_validation';
    }
    case ATTRIBUTES.TCP_KEEPALIVE: {
      return 'tcp_keepalive';
    }
    case ATTRIBUTES.MAX_ATTEMPTS: {
      return 'max_attempts';
    }
    case ATTRIBUTES.RETRY_MODE: {
      return 'retry_mode';
    }
    default:
      break;
  }
};

const name_regex = new RegExp('^([A-Za-z0-9-]+)(([A-Za-z0-9-]+)?)+$');

module.exports = {
  name_regex,
  get_attribute_list,
  get_attribute_option,
};
