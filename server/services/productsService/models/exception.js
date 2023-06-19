class BadProductError extends Error {
    constructor() {
        super();
        this.message = "Bad product.";
        this.name = "BadProductError"; // (different names for different built-in error classes)
        // this.stack = <call stack>; // non-standard, but most environments support it
    }
}

class DatabaseError extends Error {
    constructor() {
        super();
        this.message = "Failed to add product.";
        this.name = "DatabaseError"; // (different names for different built-in error classes)
        // this.stack = <call stack>; // non-standard, but most environments support it
    }
}

class BadFormError extends Error {
    constructor() {
        super();
        this.message = "Bad Form Fields Error";
        this.name = "DatabaseError"; // (different names for different built-in error classes)
        // this.stack = <call stack>; // non-standard, but most environments support it
    }
}

class UserInfoError extends Error {
    constructor() {
        super();
        this.message = "User Information Error";
        this.name = "UserError"; // (different names for different built-in error classes)
        // this.stack = <call stack>; // non-standard, but most environments support it
    }
}

module.exports = {BadProductError, DatabaseError, BadFormError, UserInfoError};