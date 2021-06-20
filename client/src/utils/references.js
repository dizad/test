module.exports = {
//get icons
    getIcon: prop => {
        let icons = {
            license: 'mdi-license',
            delete: 'mdi-close-circle',
            times: 'mdi-close',
            caution: 'mdi-alert',
            add: 'mdi-plus-circle',
            submit: 'mdi-check-circle',
            cancel: 'mdi-cancel',
            track: 'mdi-chart-timeline-variant',
            patient: 'mdi-human-handsdown',
            save: 'mdi-content-save',
            procedure: 'mdi-jump-rope',
            room: 'mdi-domain',
            physician: 'mdi-hail',
            diagnose: 'mdi-account-search',
            insurance: 'mdi-credit-card',
            code: 'mdi-needle',
            prep: 'mdi-clipboard-list',
            redirect: 'mdi-open-in-new',
            schedule: 'mdi-calendar',
            communication: 'mdi-web',
            archive: 'mdi-archive',
            center: 'mdi-webhook',
            other: 'mdi-cube',
            time: 'mdi-clock-outline',
            revise: 'mdi-lead-pencil',
            user: 'mdi-account-circle',
            hospital: 'mdi-hospital-box',
            about: 'mdi-information',
            logout: 'mdi-logout',
            login: 'mdi-login',
            password: 'mdi-help-circle',
            help: 'mdi-help',
            zone: 'mdi-alert',
            settings: 'mdi-settings',
            calibration: 'mdi-speedometer',
            application: 'mdi-application-import',
            eula: 'mdi-draw',
            print: 'mdi-printer',
            download: 'mdi-download',
            refresh: 'mdi-refresh',
            identity: 'mdi-account-card-details-outline',
            authentication: 'mdi-key',
            contact: 'mdi-phone-forward',
            dashboard: 'mdi-view-dashboard',
            clear: 'mdi-eraser',
            show: 'mdi-eye',
            hide: 'mdi-eye-off',
            anesthesia: 'mdi-pill',
            specialty: 'mdi-school'
        }
        return icons[prop] || '';
    },
//get toasts
    getToast: prop => {
        let toasts = {
            genericFormError: `Form has errors!`,
            validatorRequired: `Entry is required!`
        }
        return toasts[prop] || ``;
    }
}