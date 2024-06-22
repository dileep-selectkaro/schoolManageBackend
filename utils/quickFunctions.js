exports.formatName = (nameObject) => {
    if (nameObject === "") {
        return null
    }
    const { firstName, middleName, lastName } = nameObject;
    let fullName = `${firstName} ${lastName}`;
    if (middleName) {
        fullName = `${firstName} ${middleName} ${lastName}`;
    }
    return fullName;
};