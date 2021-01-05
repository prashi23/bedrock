/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
    'use strict';

    function sendToGTM(object) {
        if (object && object.name && object.delta && object.id) {
            var name = object.name;
            var delta = object.delta;
            var id = object.id;

            window.dataLayer.push({
                'event': 'web-vitals',
                'eAction': name,
                // Google Analytics metrics must be integers, so the value is rounded.
                // For CLS the value is first multiplied by 1000 for greater precision
                // (note: increase the multiplier for greater precision if needed).
                'eValue': Math.round(name === 'CLS' ? delta * 1000 : delta),
                // The `id` value will be unique to the current page load. When sending
                // multiple values from the same page (e.g. for CLS), Google Analytics can
                // compute a total by grouping on this ID (note: requires `eLabel` to
                // be a dimension in your report).
                'eLabel': id,
            });
        }
    }

    if (typeof Mozilla.Utils !== 'undefined' && typeof Mozilla.run !== 'undefined' && typeof window.webVitals !== 'undefined') {
        Mozilla.run(function() {
            Mozilla.Utils.onDocumentReady(function() {
                window.webVitals.getCLS(sendToGTM);
                window.webVitals.getFID(sendToGTM);
                window.webVitals.getLCP(sendToGTM);
            });
        });
    }
})();
