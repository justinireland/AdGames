import RouteContainer from './routeContainer'

function errorLoading(err) {
    console.error('Dynamic page loading failed', err)
}
function loadRoute(cb) {
    return (module) => cb(null, module.default)
}

export default {
    component: RouteContainer,
    childRoutes: [
        {
            path: '/',
            getComponent(location, cb) {
                System.import('./Player')
                    .then(loadRoute(cb))
                    .catch(errorLoading)
            }
        },
        {
            path: 'admin',
            getComponent(location, cb) {
                System.import('./Admin')
                    .then(loadRoute(cb))
                    .catch(errorLoading)
            }
        },
        {
            path: 'display',
            getComponent(location, cb) {
                System.import('./Display')
                    .then(loadRoute(cb))
                    .catch(errorLoading)
            }
        },
        {
            path: 'player',
            getComponent(location, cb) {
                System.import('./Player')
                    .then(loadRoute(cb))
                    .catch(errorLoading)
            }
        }
    ]
}