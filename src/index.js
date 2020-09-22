const fs = require('fs');
const os = require('os');
const path = require('path')
const { VERIFICATIONS, TYPES, ATTRIBUTES, GENERAL_OPTIONS } = require('./constants')

const parser = {
    _name_regex: new RegExp('^([A-Za-z0-9\-]+)(([A-Za-z0-9\-]+)?)+$'),
    _credentials_default_directory: path.join(os.homedir(), '.aws'),
    credentials: [],
    credentials_default_path: path.join(os.homedir(), '.aws', 'credentials'),
    deserialize_credentials: (credentials_file_path) => {
        try {
            // Read the file
            let file_data = fs.readFileSync(credentials_file_path, 'utf-8', 'r')

            //Split the file by break pages
            let profiles_data = file_data.split('\n')

            //Parse credentials
            profiles_data = profiles_data.reduce((acumulator, file_element) => {
                if (file_element.includes(VERIFICATIONS.COMMENT)) {
                    file_element = file_element.slice(0, file_element.indexOf(VERIFICATIONS.COMMENT))
                }
                file_element = file_element.trim();

                if (file_element.includes(VERIFICATIONS.EQUALS)) {
                    file_element = file_element.split(VERIFICATIONS.EQUALS)
                }

                if (Array.isArray(file_element)) {
                    file_element = file_element.map(_subelement => _subelement.trim())
                    file_element = {
                        type: TYPES.ATTRIBUTE,
                        key: file_element[0],
                        value: file_element[1]
                    }
                    if (acumulator.length > 0 && acumulator[acumulator.length - 1] !== null && acumulator[acumulator.length - 1] !== undefined && Array.isArray(acumulator[acumulator.length - 1].attributes)) {
                        acumulator[acumulator.length - 1].attributes.push(file_element)
                    }
                } else {
                    if (file_element.length > 0) {
                        file_element = {
                            type: TYPES.PROFILE,
                            name: file_element,
                            attributes: []
                        }
                        acumulator.push(file_element)
                    }
                }
                return acumulator
            }, []);

            //Load credentials object
            parser.credentials.push(...profiles_data)
        } catch (error) {
            parser.credentials = []
        }

    },
    import_credentials: (profiles_file_path) => {
        try {
            //Read json file
            let file_data = fs.readFileSync(profiles_file_path, 'utf-8',)

            //Load credentials object
            parser.credentials.push(...Array.from(JSON.parse(file_data)))
        } catch (error) {

        }
    },
    serialize_credentials: () => {
        if (parser.credentials && Array.isArray(parser.credentials)) {
            const profiles = parser.credentials.map((_object) => {
                return parser.paser_object(_object)
            }).join('\n')
            return profiles
        }
        throw new Error(`There are no credentials loaded`)
    },
    paser_object: (_object) => {
        switch (_object.type) {
            case TYPES.ATTRIBUTE:
                return `${_object.key} = ${_object.value}`
            case TYPES.PROFILE:
                let array = [_object.name]
                array.push(..._object.attributes.map(_attribute => parser.paser_object(_attribute)))
                array.push('\n')
                return array.join('\n')
            default:
                break;
        }
    },
    add_profile: (name, options) => {
        const default_options = {
            access_key: options.access_key === undefined ? null : options.access_key,
            secret_access_key: options.secret_access_key === undefined ? null : options.secret_access_key,
            region: options.region === undefined ? null : options.region,
            output: options.output === undefined ? GENERAL_OPTIONS.OUTPUT.JSON : options.output,
            cli_timestamp_format: options.cli_timestamp_format === undefined ? GENERAL_OPTIONS.CLI_TIMESTAMP_FORMAT.NONE : options.cli_timestamp_format,
            cli_follow_urlparam: options.cli_follow_urlparam === undefined ? true : options.cli_follow_urlparam,
            ca_bundle: options.ca_bundle === undefined ? null : options.ca_bundle,
            parameter_validation: options.parameter_validation === undefined ? true : options.parameter_validation,
            tcp_keepalive: options.tcp_keepalive === undefined ? true : options.tcp_keepalive,
            max_attempts: options.max_attempts === undefined ? null : options.max_attempts,
            retry_mode: options.retry_mode === undefined ? null : options.retry_mode
        }
        if (name && options.access_key && options.secret_access_key) {
            if (parser._name_regex.test(name)) {
                let new_profile = {
                    type: TYPES.PROFILE,
                    name: `[${name}]`,
                    attributes: [...parser.__get_attribute_list(default_options)]
                }
                return parser.credentials.push(new_profile)
            }
            throw new Error(`The name of the new profile needs to follow the pattern of number plus letters separated by dashes`)
        }
        throw new Error(`To create a new profile a name, access key, and secret access key are needed`)
    },
    edit_profile: (name, new_name, options) => {
        const default_options = {
            access_key: options.access_key === undefined ? null : options.access_key,
            secret_access_key: options.secret_access_key === undefined ? null : options.secret_access_key,
            region: options.region === undefined ? null : options.region,
            output: options.output === undefined ? null : options.output,
            cli_timestamp_format: options.cli_timestamp_format === undefined ? null : options.cli_timestamp_format,
            cli_follow_urlparam: options.cli_follow_urlparam === undefined ? null : options.cli_follow_urlparam,
            ca_bundle: options.ca_bundle === undefined ? null : options.ca_bundle,
            parameter_validation: options.parameter_validation === undefined ? null : options.parameter_validation,
            tcp_keepalive: options.tcp_keepalive === undefined ? null : options.tcp_keepalive,
            max_attempts: options.max_attempts === undefined ? null : options.max_attempts,
            retry_mode: options.retry_mode === undefined ? null : options.retry_mode
        }
        if (parser._name_regex.test(new_name)) {
            if (parser.credentials && Array.isArray(parser.credentials) && parser.credentials.length > 0) {
                parser.credentials = parser.credentials.map(profile => {
                    if (profile.name === `[${name}]`) {
                        profile.name = `[${new_name}]`
                        let new_attributes = parser.__get_attribute_list(default_options);
                        profile.attributes = profile.attributes.map(_attribute => {
                            const [new_attribute] = new_attributes.filter(_new_attrib => _new_attrib.key === _attribute.key)
                            if (new_attribute !== null && new_attribute !== undefined && new_attribute.key !== null && new_attribute.key !== undefined && new_attribute.key === _attribute.key && new_attribute.value !== _attribute.value) {
                                _attribute.value = new_attribute.value
                            }
                            return _attribute
                        })
                    }
                    return profile
                })
            }
            return;
        }
        throw new Error(`The name of the new profile needs to follow the pattern of number plus letters separated by dashes`)
    },
    save_file: () => {
        if (parser.credentials.length > 0) {
            const profiles = parser.serialize_credentials()
            fs.access(parser._credentials_default_directory, (err) => {
                if (err) {
                    fs.mkdir(parser._credentials_default_directory, (_err) => {
                        if (_err) {
                            throw new Error(`Error at create .aws directory`)
                        }
                    })
                }
                const file_stream = fs.createWriteStream(parser.credentials_default_path, { flags: 'w+', encoding: 'utf-8', overwrite: true });
                file_stream.once('open', function (fd) {
                    file_stream.write(profiles);
                    file_stream.end();
                });
                file_stream.on('end', function (fd) {
                    file_stream.close()
                })
            })

            return 1
        }
        throw new Error(`There are no profiles loaded`)
    },
    export_credentials: (export_path) => {
        if (parser.credentials && Array.isArray(parser.credentials) && parser.credentials.length > 0) {
            fs.access(export_path, (err) => {
                if (err) {
                    fs.mkdir(export_path, (_err) => {
                        if (_err) {
                            throw new Error(`Error at create .aws directory`)
                        }
                    })
                }
                const file_stream = fs.createWriteStream(path.join(export_path, `AWS_credentials_dump_${new Date().toLocaleTimeString()}.json`), { flags: 'w+', encoding: 'utf-8', overwrite: true });
                file_stream.once('open', function (fd) {
                    file_stream.write(JSON.stringify(parser.credentials, null, 2));
                    file_stream.end();
                });
                file_stream.on('end', function (fd) {
                    file_stream.close()
                })
            })
            return 1
        }
        throw new Error(`There are no profiles loaded`)
    },
    __get_attribute_list: (options) => {
        let attributes = []
        for (const [key, value] of Object.entries(options)) {
            let attribute = {
                type: TYPES.ATTRIBUTE,
                key: null,
                value: value
            }

            if (value != null) {
                switch (key) {
                    case 'access_key':
                        attribute.key = ATTRIBUTES.AWS_ACCESS_KEY_ID
                        break;
                    case 'secret_access_key':
                        attribute.key = ATTRIBUTES.AWS_SECRET_ACCESS_KEY
                        break;
                    case 'region':
                        attribute.key = ATTRIBUTES.REGION
                        break;
                    case 'output':
                        attribute.key = ATTRIBUTES.OUTPUT
                        break;
                    case 'cli_timestamp_format':
                        attribute.key = ATTRIBUTES.CLI_TIMESTAMP_FORMAT
                        break;
                    case 'cli_follow_urlparam':
                        attribute.key = ATTRIBUTES.CLI_FOLLOW_URLPARAM
                        break;
                    case 'ca_bundle':
                        attribute.key = ATTRIBUTES.CA_BUNDLE
                        break;
                    case 'parameter_validation':
                        attribute.key = ATTRIBUTES.PARAMETER_VALIDATION
                        break;
                    case 'tcp_keepalive':
                        attribute.key = ATTRIBUTES.TCP_KEEPALIVE
                        break;
                    case 'max_attempts':
                        attribute.key = ATTRIBUTES.MAX_ATTEMPTS
                        break;
                    case 'retry_mode':
                        attribute.key = ATTRIBUTES.RETRY_MODE
                        break;
                }
                attributes.push(attribute)
            }
        }
        return attributes
    }
}

parser.deserialize_credentials(parser.credentials_default_path)

module.exports = parser



