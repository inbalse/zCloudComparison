const newLogParser = (logPart) => {

    const content = logPart.substring(logPart.indexOf('content') + 10, logPart.length - 2);

    return {
        date: logPart.substring(logPart.indexOf('date') + 7, logPart.indexOf('Z') + 1),
        operation: logPart.substring(logPart.indexOf('operation') + 12, logPart.indexOf('protocol') - 4),
        type: logPart.substring(logPart.indexOf('type') + 7, logPart.indexOf('content') - 4),
        content: content === "" ? "Empty" : content,
        protocol: logPart.substring(logPart.indexOf('protocol') + 11, logPart.indexOf('type') - 4)
    };
};

module.exports = newLogParser;