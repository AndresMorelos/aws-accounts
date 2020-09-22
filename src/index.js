const { throws } = require('assert');
const fs = require('fs');
const path = require('path');
const {
  VERIFICATIONS,
  TYPES,
  GENERAL_OPTIONS,
  credentials_default_directory: credentialsDefaultDirectory,
  credentials_default_path: credentialsDefaultPath,
} = require('./constants');
const { get_attribute_list: getAttributeList, name_regex: nameRegex } = require('./utils');

class Parser {
  #credentials;
  constructor() {
    this.#credentials = [];
    this.deserialize_credentials(credentialsDefaultPath);
  }

  deserialize_credentials(credentialsFilePath) {
    try {
      // Read the file
      const fileData = fs.readFileSync(credentialsFilePath, 'utf-8', 'r');

      // Split the file by break pages
      let profilesData = fileData.split('\n');

      // Parse credentials
      profilesData = profilesData.reduce((profilesArray, profileElement) => {
        if (profileElement.includes(VERIFICATIONS.COMMENT)) {
          profileElement = profileElement.slice(0, profileElement.indexOf(VERIFICATIONS.COMMENT));
        }
        profileElement = profileElement.trim();

        if (profileElement.includes(VERIFICATIONS.EQUALS)) {
          profileElement = profileElement.split(VERIFICATIONS.EQUALS);
        }

        if (Array.isArray(profileElement)) {
          profileElement = profileElement.map((_subelement) => _subelement.trim());
          profileElement = {
            type: TYPES.ATTRIBUTE,
            key: profileElement[0],
            value: profileElement[1],
          };
          if (
            profilesArray.length > 0 &&
            profilesArray[profilesArray.length - 1] !== null &&
            profilesArray[profilesArray.length - 1] !== undefined &&
            Array.isArray(profilesArray[profilesArray.length - 1].attributes)
          ) {
            profilesArray[profilesArray.length - 1].attributes.push(profileElement);
          }
        } else if (profileElement.length > 0) {
          profileElement = {
            type: TYPES.PROFILE,
            name: profileElement,
            attributes: [],
          };
          profilesArray.push(profileElement);
        }
        return profilesArray;
      }, []);

      this.cleanCredentials();
      // Load credentials object
      this.#credentials.push(...profilesData);
    } catch (error) {}
  }

  serialize_credentials() {
    if (this.#credentials && Array.isArray(this.#credentials)) {
      const profiles = this.#credentials
        .map((_object) => {
          return this.paser_object(_object);
        })
        .join('\n');
      return profiles;
    }
    throw new Error(`There are no credentials loaded`);
  }

  import_credentials(profilesFilePath) {
    try {
      // Read json file
      const fileData = fs.readFileSync(profilesFilePath, 'utf-8');

      // Load credentials object
      this.cleanCredentials();
      this.#credentials.push(...Array.from(JSON.parse(fileData)));
    } catch (error) {}
  }

  paser_object(_object) {
    switch (_object.type) {
      case TYPES.ATTRIBUTE: {
        return `${_object.key} = ${_object.value}`;
      }
      case TYPES.PROFILE: {
        const array = [_object.name];
        array.push(..._object.attributes.map((_attribute) => this.paser_object(_attribute)));
        array.push('\n');
        return array.join('\n');
      }
      default:
        break;
    }
  }

  add_profile(name, options) {
    const defaultOptions = {
      access_key: options.access_key === undefined ? null : options.access_key,
      secret_access_key: options.secret_access_key === undefined ? null : options.secret_access_key,
      region: options.region === undefined ? null : options.region,
      output: options.output === undefined ? GENERAL_OPTIONS.OUTPUT.JSON : options.output,
      cli_timestamp_format:
        options.cli_timestamp_format === undefined
          ? GENERAL_OPTIONS.CLI_TIMESTAMP_FORMAT.NONE
          : options.cli_timestamp_format,
      cli_follow_urlparam:
        options.cli_follow_urlparam === undefined ? true : options.cli_follow_urlparam,
      ca_bundle: options.ca_bundle === undefined ? null : options.ca_bundle,
      parameter_validation:
        options.parameter_validation === undefined ? true : options.parameter_validation,
      tcp_keepalive: options.tcp_keepalive === undefined ? true : options.tcp_keepalive,
      max_attempts: options.max_attempts === undefined ? null : options.max_attempts,
      retry_mode: options.retry_mode === undefined ? null : options.retry_mode,
    };

    if (name && options.access_key && options.secret_access_key) {
      if (nameRegex.test(name)) {
        const newProfile = {
          type: TYPES.PROFILE,
          name: `[${name}]`,
          attributes: [...getAttributeList(defaultOptions)],
        };
        return this.#credentials.push(newProfile);
      }
      throw new Error(
        `The name of the new profile needs to follow the pattern of number plus letters separated by dashes`
      );
    }
    throw new Error(`To create a new profile a name, access key, and secret access key are needed`);
  }

  edit_profile(name, newName, options) {
    const defaultOptions = {
      access_key: options.access_key === undefined ? null : options.access_key,
      secret_access_key: options.secret_access_key === undefined ? null : options.secret_access_key,
      region: options.region === undefined ? null : options.region,
      output: options.output === undefined ? null : options.output,
      cli_timestamp_format:
        options.cli_timestamp_format === undefined ? null : options.cli_timestamp_format,
      cli_follow_urlparam:
        options.cli_follow_urlparam === undefined ? null : options.cli_follow_urlparam,
      ca_bundle: options.ca_bundle === undefined ? null : options.ca_bundle,
      parameter_validation:
        options.parameter_validation === undefined ? null : options.parameter_validation,
      tcp_keepalive: options.tcp_keepalive === undefined ? null : options.tcp_keepalive,
      max_attempts: options.max_attempts === undefined ? null : options.max_attempts,
      retry_mode: options.retry_mode === undefined ? null : options.retry_mode,
    };
    if (nameRegex.test(newName)) {
      if (this.#credentials && Array.isArray(this.#credentials) && this.#credentials.length > 0) {
        this.#credentials = this.#credentials.map((profile) => {
          if (profile.name === `[${name}]`) {
            profile.name = `[${newName}]`;
            let newAttributes = getAttributeList(defaultOptions);
            profile.attributes = profile.attributes.map((attribute) => {
              const [newAttribute] = newAttributes.filter(
                (newAttributeDetail) => newAttributeDetail.key === attribute.key
              );
              if (
                newAttribute !== null &&
                newAttribute !== undefined &&
                newAttribute.key !== null &&
                newAttribute.key !== undefined &&
                newAttribute.key === attribute.key &&
                newAttribute.value !== attribute.value
              ) {
                attribute.value = newAttribute.value;
              }
              return attribute;
            });
          }
          return profile;
        });
      }
      return;
    }
    throw new Error(
      `The name of the new profile needs to follow the pattern of number plus letters separated by dashes`
    );
  }

  save_file() {
    if (this.#credentials.length > 0) {
      const profiles = this.serialize_credentials();
      fs.access(credentialsDefaultDirectory, (err) => {
        if (err) {
          fs.mkdir(credentialsDefaultDirectory, (_err) => {
            if (_err) {
              throw new Error(`Error at create .aws directory`);
            }
          });
        }
        const fileStream = fs.createWriteStream(credentialsDefaultPath, {
          flags: 'w+',
          encoding: 'utf-8',
          overwrite: true,
        });
        fileStream.once('open', () => {
          fileStream.write(profiles);
          fileStream.end();
        });
        fileStream.on('end', () => {
          fileStream.close();
        });
      });

      return 1;
    }
    throw new Error(`There are no profiles loaded`);
  }

  export_credentials(exportPath) {
    if (this.#credentials && Array.isArray(this.#credentials) && this.#credentials.length > 0) {
      fs.access(exportPath, (err) => {
        if (err) {
          fs.mkdir(exportPath, (_err) => {
            if (_err) {
              throw new Error(`Error at create .aws directory`);
            }
          });
        }
        const fileStream = fs.createWriteStream(
          path.join(exportPath, `AWS_credentials_dump_${new Date().toLocaleTimeString()}.json`),
          { flags: 'w+', encoding: 'utf-8', overwrite: true }
        );
        fileStream.once('open', () => {
          fileStream.write(JSON.stringify(this.#credentials, null, 2));
          fileStream.end();
        });
        fileStream.on('end', () => {
          fileStream.close();
        });
      });
      return 1;
    }
    throw new Error(`There are no profiles loaded`);
  }

  getCredentials() {
    return this.#credentials;
  }

  cleanCredentials() {
    this.#credentials = [];
  }
}

module.exports = new Parser();
