(function () {
    'use strict';

    module.exports = ErrorHandlerMiddleware;

    function ErrorHandlerMiddleware(err, req, res/*, next*/) {
        console.error(err.message);
        console.error(err.stack);
        res.status(500).json({error: err});
    }
})();
