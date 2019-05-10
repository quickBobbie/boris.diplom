angular.module('boris').service('notify', [
    function() {
        let settings = {
            element: 'body',
            type: 'info',
            placement: {
                from: "bottom",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: 1000,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            icon_type: 'class'
        };

        const sendNotify = (options,type) => {
            settings.type = type;
            // $.notify(options, settings);
        };

        const info = (title, message) => {
            let options = {
                title: title,
                message: message,
                icon: "glyphicon glyphicon-info-sign"
            };
            sendNotify(options, "info");
        };

        const success = (title, message) => {
            let options = {
                title: title,
                message: message,
                icon: "glyphicon glyphicon-success-sign"
            };
            sendNotify(options, "success");
        };

        const error = (title, message) => {
            let options = {
                title: title,
                message: message,
                icon: "glyphicon glyphicon-error-sign"
            };
            sendNotify(options, "danger");
        };

        const warning = (title, message) => {
            let options = {
                title: title,
                message: message,
                icon: "glyphicon glyphicon-danger-sign"
            };
            sendNotify(options, "warning");
        };

        return {
            info: info,
            success: success,
            error: error,
            warning: warning
        }
    }
]);