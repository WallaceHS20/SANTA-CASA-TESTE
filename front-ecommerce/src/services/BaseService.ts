export abstract class BaseService {
    protected static prefix: string = ""

    protected static setPrefix(prefix: string) {
        this.prefix = prefix
    }

    protected static endpoint(path: string): string {
        return this.prefix + path
    }

}