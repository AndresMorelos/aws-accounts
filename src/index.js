const fs = require('fs');
const os = require('os')
const path = require('path')
const { VERIFICATIONS, TYPES, ATTRIBUTES } = require('./constants')

const parser = {
    _name_regex: new RegExp('^([A-Za-z0-9\-]+)(([A-Za-z0-9\-]+)?)+$'),
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
    add_profile: (name, access_key, secret_access_key) => {
        if (name && access_key && secret_access_key) {
            if(parser._name_regex.test(name)){
                return parser.credentials.push({
                    type: TYPES.PROFILE,
                    name: `[${name}]`,
                    attributes: [{
                        type: TYPES.ATTRIBUTE,
                        key: ATTRIBUTES.AWS_ACCESS_KEY_ID,
                        value: access_key
                    },
                    {
                        type: TYPES.ATTRIBUTE,
                        key: ATTRIBUTES.AWS_SECRET_ACCESS_KEY,
                        value: secret_access_key
                    }]
                })
            }
            throw new Error(`The name of the new profile needs to follow the pattern of number plus letters separated by dashes`)
        }
        throw new Error(`To create a new profile a name, access key, and secret access key are needed`)
    }
}

parser.deserialize_credentials(parser.credentials_default_path)

module.exports = parser



