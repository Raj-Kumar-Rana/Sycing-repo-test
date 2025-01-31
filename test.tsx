const fs = require('fs');

class FileOperations {
    static writeFile(filePath, content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`File written to ${filePath}`);
    }

    static readFile(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }

    static deleteFile(filePath) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        } else {
            console.log(`File not found: ${filePath}`);
        }
    }
}

// Example usage
const filePath = 'example.txt';
FileOperations.writeFile(filePath, 'Hello, world!');
console.log(FileOperations.readFile(filePath));
FileOperations.deleteFile(filePath);
