import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import React, { Suspense } from 'react'
import path from 'path'
import routes from '@/routerConfig'
import PageLoading from '@/components/PageLoading'

const RouteItem = props => {
    const { redirect, path: routePath, component, key, pageload } = props
    if (redirect) {
        return <Redirect exact key={key} from={routePath} to={redirect} />
    }
    // return <Route key={key} component={component} path={routePath} />
    if (routePath && !pageload) {
        return <Route key={key} children={React.createElement(component)} path={routePath} />
    }
    return <Route key={key} component={component} path={routePath} />
}

const router = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route, id) => {
                    const {
                        component: RouteComponent,
                        children,
                        ...others
                    } = route
                    return (
                        <Route
                            key={id}
                            {...others}
                            component={props => {
                                return children ? (
                                    <RouteComponent key={id} {...props}>
                                        {/* <Switch> */}
                                        {children.map(
                                            (routeChild, idx) => {
                                                const {
                                                    redirect,
                                                    path: childPath,
                                                    component,
                                                    pageload
                                                } = routeChild
                                                return RouteItem({
                                                    key: `${id}-${idx}`,
                                                    redirect,
                                                    path: childPath && path.join(route.path, childPath),
                                                    pageload,
                                                    component
                                                })
                                            }
                                        )}
                                        {/* </Switch> */}
                                    </RouteComponent>
                                ) : (
                                    <Suspense fallback={<PageLoading />}>
                                        {RouteItem({
                                            key: id,
                                            ...props
                                        })}
                                    </Suspense>
                                )
                            }}
                        />
                    )
                })}
            </Switch>
        </Router>
    )
}

export default router
