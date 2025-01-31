class Utility {
    static generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Example usage
console.log(Utility.generateRandomNumber(1, 100));
console.log(Utility.formatDate(new Date()));
console.log(Utility.capitalizeFirstLetter("hello"));
