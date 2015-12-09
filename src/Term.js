'use strict';

var utils = require('./utils');

function Term(token, projectId, languageCode, data) {
    Object.defineProperties(this, {
        __token: { value: token },
        __projectId: { value: projectId },
        __languageCode: { value: languageCode },

        term: { value: data.term, enumerable: true },
        context: { value: data.context, enumerable: true },
        reference: { value: data.reference, enumerable: true },
        tags: { value: data.tags, enumerable: true },
        created: { value: data.created, enumerable: true },
        updated: { value: data.updated, enumerable: true },
        fuzzy: { value: !!data.definition && !!data.definition.fuzzy, enumerable: true },
        translation: { value: data.definition && data.definition.form, enumerable: true }
    });
}

module.exports = Term;
