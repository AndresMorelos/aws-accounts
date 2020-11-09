import { GENERAL_OPTIONS, EditProfileOptions, REGIONS } from '../constants/'
const nameRegex = /\[([^)]+)\]/
export class Profile {
    private output: string;
    private cli_timestamp_format: string = GENERAL_OPTIONS.CLI_TIMESTAMP_FORMAT.WIRE;
    private cli_follow_urlparam: boolean = true;
    private parameter_validation: boolean = true;
    private tcp_keepalive: boolean = true;
    private max_attempts: number | undefined;
    private name: string;
    private aws_access_key_id: string;
    private aws_secret_access_key: string;
    private region: string | undefined;
    private ca_bundle: string | undefined;
    private retry_mode: string | undefined;

    constructor(name: string,
        aws_access_key_id: string,
        aws_secret_access_key: string,
        region: string | undefined = REGIONS.US_EAST_1,
        output: string = GENERAL_OPTIONS.OUTPUT.JSON,
        cli_timestamp_format: string = GENERAL_OPTIONS.CLI_TIMESTAMP_FORMAT.WIRE,
        cli_follow_urlparam: boolean = true,
        ca_bundle: string | undefined = undefined,
        parameter_validation: boolean = true,
        tcp_keepalive: boolean = true,
        max_attempts: number | undefined = undefined,
        retry_mode: string | undefined = undefined) {

        this.name = this.setName(name);
        this.aws_access_key_id = aws_access_key_id;
        this.aws_secret_access_key = aws_secret_access_key;
        this.region = region;
        this.output = output;
        this.cli_timestamp_format = cli_timestamp_format;
        this.cli_follow_urlparam = cli_follow_urlparam;
        this.ca_bundle = ca_bundle;
        this.parameter_validation = parameter_validation
        this.tcp_keepalive = tcp_keepalive
        this.max_attempts = max_attempts
        this.retry_mode = retry_mode
    }

    private nameRegexMatches(name: string): RegExpExecArray | null {
        return nameRegex.exec(name);
    }

    private setName(name: string): string {
        const matches = this.nameRegexMatches(name)
        if (matches !== null && matches.length > 0) {
            return matches[1]
        }
        return `[${name}]`
    }

    getName(): string {
        const matches = this.nameRegexMatches(this.name)
        if (matches !== null && matches.length > 0) {
            return matches[1]
        }
        return this.name;
    }

    editProfile(options: EditProfileOptions): Profile {
        this.name = options.name ? this.setName(options.name) : this.name;
        this.aws_access_key_id = options.aws_access_key_id ? options.aws_access_key_id : this.aws_access_key_id;
        this.aws_secret_access_key = options.aws_secret_access_key ? options.aws_secret_access_key : this.aws_secret_access_key;
        this.region = options.region ? options.region : this.region;
        this.output = options.output ? options.output : this.output;
        this.cli_timestamp_format = options.cli_timestamp_format ? options.cli_timestamp_format : this.cli_timestamp_format;
        this.cli_follow_urlparam = options.cli_follow_urlparam ? options.cli_follow_urlparam : this.cli_follow_urlparam;
        this.parameter_validation = options.parameter_validation ? options.parameter_validation : this.parameter_validation;
        this.tcp_keepalive = options.tcp_keepalive ? options.tcp_keepalive : this.tcp_keepalive;
        this.max_attempts = options.max_attempts ? options.max_attempts : this.max_attempts;
        this.ca_bundle = options.ca_bundle ? options.ca_bundle : this.ca_bundle;
        this.retry_mode = options.retry_mode ? options.retry_mode : this.retry_mode;

        return this
    }

    toJSON() {
        const object: any = {
            name: this.getName(),
            aws_access_key_id: this.aws_access_key_id,
            aws_secret_access_key: this.aws_secret_access_key,
            region: this.region,
            output: this.output,
            cli_timestamp_format: this.cli_timestamp_format,
            cli_follow_urlparam: this.cli_follow_urlparam,
            ca_bundle: this.ca_bundle,
            parameter_validation: this.parameter_validation,
            tcp_keepalive: this.tcp_keepalive,
            max_attempts: this.max_attempts,
            retry_mode: this.retry_mode
        }

        Object.keys(object).forEach((key) => object[key] === undefined && delete object[key])
        return object
    }

    toString() {
        const object = this.toJSON()

        const result = Object.keys(object).map(key => {
            if (key === 'name') {
                return `[${object[key]}]`
            }
            return `${key} = ${object[key]}`
        });

        return result.join('\n')

    }

    toTable() {
        console.table({
            name: this.getName(),
            aws_access_key_id: this.aws_access_key_id,
            aws_secret_access_key: this.aws_secret_access_key,
            region: this.region,
            output: this.output,
            cli_timestamp_format: this.cli_timestamp_format,
            cli_follow_urlparam: this.cli_follow_urlparam,
            ca_bundle: this.ca_bundle,
            parameter_validation: this.parameter_validation,
            tcp_keepalive: this.tcp_keepalive,
            max_attempts: this.max_attempts,
            retry_mode: this.retry_mode
        })
    }

}