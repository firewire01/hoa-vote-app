export class FileDTO {
    base64: string;
    name: string;
    type: string;


    constructor(
        base64: string,
        name: string,
        type: string
    ) {
        this.base64 = base64
        this.name = name
        this.type = type
    }
}

export class ImageFile {
    file: string;

    constructor(file: string) {
        this.file = file
    }
}