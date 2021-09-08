const PO = require('pofile');
const fs = require('fs');
const path = require('path');

module.exports = function readPoFiles(directories) {
    return Promise.all(
        directories.map(directory =>
            fs.promises.readdir(directory).then(files =>
                Promise.all(
                    files
                        .filter(file => /\.po$/.test(file))
                        .map(
                            file =>
                                new Promise((resolve, reject) =>
                                    PO.load(path.join(directory, file), (err, po) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }

                                        const language = po.headers.Language;

                                        const strings = {};
                                        po.items.forEach(item => {
                                            if (item.msgctxt) {
                                                reject(`"msgctxt" not supported; Text: "${item.msgid}"`);
                                                return;
                                            }
                                            if (item.msgid_plural) {
                                                reject(`"msgid_plural" not supported; Text: "${item.msgid}"`);
                                                return;
                                            }

                                            strings[item.msgid] = item.msgstr[0];
                                        });

                                        resolve({ language, strings });
                                    })
                                )
                        )
                )
            )
        )
    ).then(directories => Array.prototype.concat(...directories));
};
