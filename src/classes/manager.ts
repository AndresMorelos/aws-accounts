import { Profile } from './profile';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { VERIFICATIONS, CredentialExports, ProfileOptions, REGIONS, EditProfileOptions } from '../constants'


export class Manager {
    private defaultDirectory = path.join(os.homedir(), '.aws');
    private defaultPath = path.join(this.defaultDirectory, 'credentials');
    private credentials: Array<Profile> = [];
    public regions = REGIONS;
    public CredentialExportsType = CredentialExports;

    constructor() {
        this.credentials = this.deserializeCredentials();
    }

    /**
     * 
     * @param options : Options object for a profile
     */
    addProfile(options: ProfileOptions) {
        this.credentials.push(new Profile(
            options.name,
            options.aws_access_key_id,
            options.aws_secret_access_key,
            options.region ? options.region : this.regions.US_EAST_1,
            options.output,
            options.cli_timestamp_format,
            options.cli_follow_urlparam,
            options.ca_bundle,
            options.parameter_validation,
            options.tcp_keepalive,
            options.max_attempts,
            options.retry_mode))

        return this
    }

    /**
     * 
     * @param name : Name of the profile to edit
     * @param options : Options object for a profile
     */
    editProfile(name: string, options: EditProfileOptions): Manager {
        if (this.credentials && Array.isArray(this.credentials) && this.credentials.length > 0) {
            this.credentials = this.credentials.map((profile) => {
                if (profile.getName() === name) {
                    profile.editProfile(options);
                }
                return profile;
            })
        }
        return this
    }


    /**
     * 
     * @param name : Name of the profile to delete
     */
    deleteProfile(name: string): Manager {
        if (this.credentials && Array.isArray(this.credentials) && this.credentials.length > 0) {
            this.credentials = this.credentials.filter((profile) => {
                return profile.getName() !== name
            });
        }

        return this
    }

    /**
     * 
     * @param name : Name of the profile that will be the new default
     */
    switchProfile(name: string): Manager {
        if (name) {
            if (this.credentials && Array.isArray(this.credentials) && this.credentials.length > 0) {
                const profileResult: Array<Profile> = this.credentials.filter(
                    (_profile) => _profile.getName() === name
                );
                if (profileResult.length === 1) {
                    const profile = profileResult[0].toJSON();
                    delete profile.name;
                    this.editProfile('default', profile);
                    return this;
                }
                throw new Error(`The profile ${name} doesn't exists`);
            }
        } else {
            throw new Error(`A name needs to be given`);
        }
        return this
    }

    /**
     * 
     * @param path : Path of the file to desearilice, default : ~/.aws/credentials
     * @returns Array<Profile> : an Array of the profiles loaded.
     */
    deserializeCredentials(path: string = this.defaultPath): Array<Profile> {
        let profiles: Array<Profile> = []
        try {
            // Read the file
            const fileData = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });
            // Split the file by break pages
            let _profilesFileData = fileData.split('\n');
            // Parse credentials
            const _profiles: any[] = _profilesFileData.reduce((profilesArray: any[], profileElement: string) => {
                let _elementName: string | undefined = undefined,
                    _elementValue: string | undefined = undefined;

                if (profileElement.includes(VERIFICATIONS.COMMENT)) {
                    profileElement = profileElement.slice(0, profileElement.indexOf(VERIFICATIONS.COMMENT));
                }
                profileElement = profileElement.trim();

                if (profileElement.includes(VERIFICATIONS.EQUALS)) {
                    let profileElementSplitResult = profileElement.split(VERIFICATIONS.EQUALS);
                    profileElementSplitResult = profileElementSplitResult.map((_subelement) => _subelement.trim());
                    _elementName = profileElementSplitResult[0]
                    _elementValue = profileElementSplitResult[1]
                } else {
                    _elementName = profileElement
                }

                if (_elementName !== undefined && _elementValue !== undefined) {
                    if (
                        profilesArray.length > 0 &&
                        profilesArray[profilesArray.length - 1] !== null &&
                        profilesArray[profilesArray.length - 1] !== undefined
                    ) {
                        profilesArray[profilesArray.length - 1][_elementName] = _elementValue;
                    }
                } else {
                    if (_elementName !== '') {
                        profilesArray.push({
                            'name': _elementName
                        })
                    }
                }

                return profilesArray;
            }, []);

            if (_profiles.length > 0) {
                profiles = _profiles.map((profile) => new Profile(profile.name,
                    profile.aws_access_key_id,
                    profile.aws_secret_access_key,
                    profile.region,
                    profile.output,
                    profile.cli_timestamp_format,
                    profile.cli_follow_urlparam,
                    profile.ca_bundle,
                    profile.parameter_validation,
                    profile.tcp_keepalive,
                    profile.max_attempts,
                    profile.retry_mode))
            }

        } catch (error) {
            console.error(error)
        }

        return profiles;
    }

    /**
     * 
     * @param path : Path where the file to import is located
     * 
     */
    importCredentials(profilesFilePath: string): Manager {
        try {
            // Read json file
            const fileData = fs.readFileSync(profilesFilePath, 'utf-8');

            const _profiles: any = [...Array.from(JSON.parse(fileData))]
            // Load credentials object
            this.cleanCredentials();

            this.credentials = _profiles.map((profile: any) => new Profile(profile.name,
                profile.aws_access_key_id,
                profile.aws_secret_access_key,
                profile.region,
                profile.output,
                profile.cli_timestamp_format,
                profile.cli_follow_urlparam,
                profile.ca_bundle,
                profile.parameter_validation,
                profile.tcp_keepalive,
                profile.max_attempts,
                profile.retry_mode))

        } catch (error) { }

        return this
    }

    /**
     * 
     * @param destinationPath : Destination Path
     * 
     */
    exportCredentials(destinationPath: string): void {
        if (this.credentials && this.credentials.length == 0) {
            throw new Error(`There are no profiles loaded`);
        }

        const fileName = `AWS_credentials_dump_${new Date().toLocaleTimeString()}.json`
        fs.access(destinationPath, (err) => {
            if (err) {
                fs.mkdir(destinationPath, (_err) => {
                    if (_err) {
                        throw new Error(`Error at create .aws directory`);
                    }
                });
            }
            const fileStream = fs.createWriteStream(
                path.join(destinationPath, fileName),
                { flags: 'w+', encoding: 'utf-8' }
            );
            fileStream.once('open', () => {
                fileStream.write(JSON.stringify(this.getCredentials(), null, 2));
                fileStream.end();
            });
            fileStream.on('end', () => {
                fileStream.close();
            });
        });


    }

    saveFile(filePath: string = this.defaultPath): void {
        if (this.credentials.length > 0) {
            const profiles = this.getCredentials(this.CredentialExportsType.TEXT);
            fs.access(filePath, (err) => {
                if (err) {
                    fs.mkdir(filePath, (_err) => {
                        if (_err) {
                            throw new Error(`Error at create .aws directory`);
                        }
                    });
                }
                const fileDestination = filePath === this.defaultPath ? this.defaultPath : path.join(filePath, 'credentials')
                const fileStream = fs.createWriteStream(fileDestination, {
                    flags: 'w+',
                    encoding: 'utf-8'
                });
                fileStream.once('open', () => {
                    fileStream.write(profiles);
                    fileStream.end();
                });
                fileStream.on('end', () => {
                    fileStream.close();
                });
            });
        } else {
            throw new Error(`There are no profiles loaded`);
        }

    }

    getCredentials(type: string = CredentialExports.JSON): Array<Profile> | Object | string {
        switch (type) {
            case CredentialExports.JSON: {
                return this.credentials.map(profile => profile.toJSON());
            }
            case CredentialExports.TEXT: {
                return (this.credentials.map(profile => profile.toString())).join('\n\n') // Two break pages to identify each profile
            }
            default: {
                return this.credentials
            }
        }
    }

    cleanCredentials(): void {
        this.credentials = []
    }

}